import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';

@Injectable()
export class HelpHandler implements ICommandHandler {
  name = 'help';
  test(content: string): boolean {
    return /^!help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.channel.send({
      embed: {
        description: 'Webeleon bot template help',
        fields: [
          {
            name: '!help',
            value: 'display this message',
          },
          {
            name: '!ping',
            value: 'reply `pong!`',
          },
          {
            name: '!invite',
            value: 'Send an invite link for this awesome bot!',
          },
        ],
      },
    });
  }
}
