import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { CommandsInterfaces } from '../commands.interfaces';

@Injectable()
export class PingHandler implements CommandsInterfaces {
  name = 'ping';
  test(content: string): boolean {
    return /^!ping/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply('pong!');
  }
}
