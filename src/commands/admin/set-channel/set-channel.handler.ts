import { Injectable, Logger } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { ServerService } from '../../../server/server.service';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class SetChannelHandler implements ICommandHandler {
  constructor(
    private readonly serverService: ServerService,
    private readonly configService: ConfigService,
  ) {}

  name = `${this.configService.adminPrefix} set channel`;
  description =
    'Admin command: allow the bot to be used in the specific channel';
  regex = new RegExp(`^${this.configService.adminPrefix} set channel`, 'i');

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    const server = await this.serverService.setChannel(
      message.guild,
      message.author.id,
      message.channel,
    );
    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Channel authorized')
      .setDescription(`**Currently authorized channels**
${server.allowedChannels.map((chan) => `<#${chan}>`).join('\n')}`);
    message.channel.send(embed);
  }
}
