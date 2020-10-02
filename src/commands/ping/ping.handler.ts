import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';

@Injectable()
export class PingHandler implements ICommandHandler {
  name = 'ping';
  test(content: string): boolean {
    return /^!ping/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply('pong!');
  }
}
