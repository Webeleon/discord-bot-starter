import { Injectable } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { ServerService } from '../../../server/server.service';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class UnsetChannelHandler implements ICommandHandler {
  constructor(
    private readonly serverService: ServerService,
    private readonly configService: ConfigService,
  ) {}

  name = `${this.configService.adminPrefix} unset channel`;
  description = `Admin command: remove the usage flag in a channel. If no channel are flagged as bot channel, All channels are allowed`;
  regex = new RegExp(`^${this.configService.adminPrefix} unset channel`, 'i');

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    const server = await this.serverService.unsetChannel(
      message.guild,
      message.author.id,
      message.channel,
    );
    const embed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`Channel unauthorized`)
      .setDescription(`**Currently authorized channels**
${server.allowedChannels.map((chan) => `<#${chan}>`).join(`\n`)}`);
    await message.channel.send(embed);
  }
}
