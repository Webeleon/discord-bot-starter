import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { Client } from 'discord.js';
import { CommandsService } from '../commands/commands.service';

@Injectable()
export class DiscordService {
  client: Client;
  ready: boolean;

  constructor(private readonly config: ConfigService) {}

  connect(): Client {
    this.client = new Client();

    this.client.on('ready', () => {
      Logger.log(`Discord connected with handle ${this.client.user.tag}`);
      this.ready = true;
    });

    this.client.login(this.config.discordToken);

    return this.client;
  }

  async isGuildAvailable(guildId: string): Promise<boolean> {
    const guild = await this.client.guilds.resolve(guildId);
    return !!guild;
  }

  async isChannelAvailable(channelId: string): Promise<boolean> {
    const channel = await this.client.channels.fetch(channelId, false);
    return !!channel;
  }
}
