import { Module } from '@nestjs/common';

// Dependencies
import { ConfigModule } from '../config/config.module';
import { DiscordModule } from '../discord/discord.module';
import { ServerModule } from '../server/server.module';
import { CommandsService } from './commands.service';

// Handlers
import { PingHandler } from './ping/ping.handler';
import { InviteHandler } from './invite/invite.handler';
import { HelpHandler } from './help/help.handler';
import { StatusHandler } from './status/status.handler';

// Admin handlers
import { SetPrefixHandler } from './admin/set-prefix/set-prefix.handler';
import { SetAdminRoleHandler } from './admin/set-admin-role/set-admin-role.handler';
import { SetChannelHandler } from './admin/set-channel/set-channel.handler';
import { UnsetChannelHandler } from './admin/unset-channel/unset-channel.handler';

@Module({
  imports: [ConfigModule, DiscordModule, ServerModule],
  providers: [
    CommandsService,

    // user commands
    PingHandler,
    InviteHandler,
    HelpHandler,
    StatusHandler,

    // admin commands
    SetAdminRoleHandler,
    SetPrefixHandler,
    SetChannelHandler,
    UnsetChannelHandler,
  ],
  exports: [CommandsService],
})
export class CommandsModule {}
