import { Injectable, Logger } from '@nestjs/common';
import { Client, Message } from 'discord.js';

import { ICommandHandler } from './ICommandHandler';
import { PingHandler } from './ping/ping.handler';
import { InviteHandler } from './invite/invite.handler';
import { HelpHandler } from './help/help.handler';
import { StatusHandler } from './status/status.handler';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandHandler[] = [];

  constructor(
    private readonly pingHandler: PingHandler,
    private readonly inviteHandler: InviteHandler,
    private readonly helpHandler: HelpHandler,
    private readonly statusHandler: StatusHandler,
  ) {
    this.commandHandlers = [
      pingHandler,
      inviteHandler,
      helpHandler,
      statusHandler,
    ];
  }
  register(client: Client) {
    for (const command of this.commandHandlers) {
      Logger.log(`${command.name} registered`, 'CommandExplorer');
    }

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
