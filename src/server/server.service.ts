import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guild, GuildMember, Permissions, Channel } from 'discord.js';

import { IServerDocument } from './server.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ServerService {
  constructor(
    @InjectModel('Server') private serverModel: Model<IServerDocument>,
    private readonly configService: ConfigService,
  ) {}

  async getServer(serverId: string): Promise<IServerDocument> {
    const server = await this.serverModel.findOne({ serverId });
    if (!server) {
      return this.serverModel.create({
        serverId,
      });
    }
    return server;
  }

  async getServerPrefix(serverId: string): Promise<string> {
    const server = await this.getServer(serverId);
    return server.prefix ?? '!';
  }

  async setServerPrefix(serverId: string, prefix: string): Promise<string> {
    if (
      this.configService.adminPrefix.trim().toLowerCase() ===
      prefix.trim().toLowerCase()
    ) {
      throw new Error(`You can not use the \`${prefix}\` prefix.`);
    }
    const server = await this.getServer(serverId);
    const formattedFormatedPrefix = this.formatPrefix(prefix);
    server.prefix = formattedFormatedPrefix;
    await server.save();
    return formattedFormatedPrefix;
  }

  formatPrefix(prefix: string): string {
    if (prefix.length === 1) return prefix;
    return prefix + ' ';
  }

  administratorGuard(requester: GuildMember): void {
    if (!requester.hasPermission(Permissions.FLAGS.ADMINISTRATOR)) {
      throw new Error(
        `Only user with administrator permissions can set the admin role`,
      );
    }
  }

  async setAdminRole(
    guild: Guild,
    requesterId: string,
    role: string,
  ): Promise<void> {
    const requester = guild.members.resolve(requesterId);
    this.administratorGuard(requester);
    const server = await this.getServer(guild.id);
    server.adminRole = role;
    await server.save();
  }

  async hasAdminRoleGuard(guild: Guild, requesterId: string): Promise<void> {
    const requester = guild.members.resolve(requesterId);
    const server = await this.getServer(guild.id);
    try {
      this.administratorGuard(requester);
    } catch (error) {
      if (!requester.roles.cache.has(server.adminRole)) {
        throw new Error(
          `Only administrator or member with the role <@&${server.adminRole}> can use this method.`,
        );
      }
    }
  }

  // Channels
  async setChannel(
    guild: Guild,
    requesterId: string,
    channel: Channel,
  ): Promise<IServerDocument> {
    await this.hasAdminRoleGuard(guild, requesterId);
    const server = await this.getServer(guild.id);
    if (!server.allowedChannels) {
      server.allowedChannels = [channel.id];
      await server.save();
    } else {
      if (!server.allowedChannels.includes(channel.id)) {
        server.allowedChannels.push(channel.id);
        await server.save();
      }
    }

    return server;
  }

  async unsetChannel(
    guild: Guild,
    requesterId: string,
    channel: Channel,
  ): Promise<IServerDocument> {
    await this.hasAdminRoleGuard(guild, requesterId);
    const server = await this.getServer(guild.id);
    if (!server.allowedChannels) {
      server.allowedChannels = [];
      await server.save();
    } else {
      if (server.allowedChannels.includes(channel.id)) {
        server.allowedChannels = server.allowedChannels.filter(
          chanId => chanId !== channel.id,
        );
        await server.save();
      }
    }

    return server;
  }

  async isChannelAllowed(
    serverId: string,
    channelId: string,
  ): Promise<boolean> {
    const server = await this.getServer(serverId);
    return !!(
      !server.allowedChannels ||
      server.allowedChannels?.length === 0 ||
      server.allowedChannels.includes(channelId)
    );
  }
}
