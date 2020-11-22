import { Injectable } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';
import { ServerService } from '../../server/server.service';

@Injectable()
export class HelpHandler implements ICommandHandler {
  constructor(private readonly serverService: ServerService) {}

  name = 'help';
  regex = new RegExp('^help', 'i');

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    const prefix = await this.serverService.getServerPrefix(message.guild.id);

    const embed = new MessageEmbed()
      .setDescription('Webeleon bot template help')
      .addFields([
        {
          name: `${prefix}help`,
          value: 'display this message',
        },
        {
          name: `${prefix}ping`,
          value: 'reply `pong!`',
        },
        {
          name: `${prefix}invite`,
          value: 'Send an invite link for this awesome bot!',
        },
        {
          name: `${prefix}status`,
          value: 'display bot informations',
        },
      ]);

    message.channel.send(embed);
  }
}
