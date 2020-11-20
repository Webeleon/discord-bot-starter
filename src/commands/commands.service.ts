import { Injectable, Logger } from '@nestjs/common';
import { Client, Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from './ICommandHandler';
import { ServerService } from '../server/server.service';
import { ConfigService } from '../config/config.service';

import { PingHandler } from './ping/ping.handler';
import { InviteHandler } from './invite/invite.handler';
import { HelpHandler } from './help/help.handler';
import { StatusHandler } from './status/status.handler';
import { SetPrefixHandler } from './admin/set-prefix/set-prefix.handler';
import { SetAdminRoleHandler } from './admin/set-admin-role/set-admin-role.handler';
import { SetChannelHandler } from './admin/set-channel/set-channel.handler';
import { UnsetChannelHandler } from './admin/unset-channel/unset-channel.handler';

@Injectable()
export class CommandsService {
  commandHandlers: ICommandHandler[] = [];

  constructor(
    // service dependencies
    private readonly serverService: ServerService,
    private readonly configService: ConfigService,

    // Handlers: TODO: autoload
    private readonly pingHandler: PingHandler,
    private readonly inviteHandler: InviteHandler,
    private readonly helpHandler: HelpHandler,
    private readonly statusHandler: StatusHandler,

    // Admin handlers
    private readonly setAdminRole: SetAdminRoleHandler,
    private readonly setPrefixHandler: SetPrefixHandler,
    private readonly setChannelHandler: SetChannelHandler,
    private readonly unsetChannelHandler: UnsetChannelHandler,
  ) {
    this.commandHandlers = [
      // User commands
      pingHandler,
      inviteHandler,
      helpHandler,
      statusHandler,

      // admin commands
      setAdminRole,
      setPrefixHandler,
      setChannelHandler,
      unsetChannelHandler,
    ];
  }
  register(client: Client) {
    for (const command of this.commandHandlers) {
      Logger.log(
        `${command.name} registered => ${
          command.regex ?? command.description ?? '?'
        }`,
        'CommandExplorer',
      );
    }

    client.on('message', async (message) => {
      try {
        await this.messageHandler(message);
      } catch (error) {
        Logger.error(error.message, error.stack);
        const errorEmbed = new MessageEmbed()
          .setColor('RED')
          .setDescription(error.message);
        message.channel.send(errorEmbed);
      }
    });
  }

  async messageHandler(message: Message) {
    if (message.author.bot) return;
    const { content } = message;

    // Test for custom prefix
    const serverPrefix = await this.serverService.getServerPrefix(
      message.guild.id,
    );
    const prefixRegexp = new RegExp(
      `^(${this.escapePrefixForRegexp(
        this.configService.adminPrefix,
      )}|${this.escapePrefixForRegexp(serverPrefix)})`,
      'i',
    );
    if (!prefixRegexp.test(message.content)) return;
    const serverPrefixRegexp = new RegExp(
      `^${this.escapePrefixForRegexp(serverPrefix)}`,
      'i',
    );
    if (serverPrefixRegexp.test(message.content)) {
      // test if channel is allowed only on user commands
      if (
        !(await this.serverService.isChannelAllowed(
          message.guild.id,
          message.channel.id,
        ))
      ) {
        return;
      }
      message.content = message.content.replace(serverPrefixRegexp, '').trim();
    }

    for (const handler of this.commandHandlers) {
      if (handler.test(message.content)) {
        try {
          Logger.debug(`executing command [${handler.name}] => ${content}`);
          await handler.execute(message);
          return;
        } catch (error) {
          Logger.error(error.message, error.stack);
          const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(error.message);
          message.channel.send(errorEmbed);
        }
      }
    }
  }

  private escapePrefixForRegexp(serverPrefix: string): string {
    const char = serverPrefix[0];
    if ('./+\\*!?)([]{}^$'.split('').includes(char)) return `\\${serverPrefix}`;
    return serverPrefix;
  }
}
