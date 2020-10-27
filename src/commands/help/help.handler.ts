import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';
import { ServerService } from '../../server/server.service';

@Injectable()
export class HelpHandler implements ICommandHandler {
  constructor(private readonly serverService: ServerService) {}

  name = 'help';
  test(content: string): boolean {
    return /^help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    const prefix = await this.serverService.getServerPrefix(message.guild.id);

    message.channel.send({
      embed: {
        description: 'Webeleon bot template help',
        fields: [
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
        ],
      },
    });
  }
}
