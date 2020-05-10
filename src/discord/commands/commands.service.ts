import { Injectable, Logger } from '@nestjs/common';
import { Client, Message } from 'discord.js';

import { ICommandService } from './interfaces/ICommandService';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandService[];

  constructor() {}
  register(client: Client) {
    client.on('message', async message => await this.messageHandler(message));
  }

  async messageHandler(message: Message) {
    if (message.author.bot) return;
    const { content } = message;
    for (const handler of this.commandHandlers) {
      if (handler.test(content)) {
        Logger.debug(`executing command [${handler.name}] => ${content}`);
        await handler.execute(message);
      }
    }
  }
}
