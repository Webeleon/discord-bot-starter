import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../interfaces/ICommandService';

@Injectable()
export class PingHandler implements ICommandService {
  name = 'ping';
  test(content: string): boolean {
    return /!ping/.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply('pong!');
  }
}
