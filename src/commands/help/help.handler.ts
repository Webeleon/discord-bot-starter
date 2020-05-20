import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';
import { ICommandService } from '../../discord/interfaces/ICommandService';

@Injectable()
export class HelpHandler implements ICommandService {
  name = 'help';
  test(content: string): boolean {
    return /^!help/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply({
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
