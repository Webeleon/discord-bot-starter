import { Module } from '@nestjs/common';
import { PingHandler } from './ping/ping.handler';
import { InviteHandler } from './invite/invite.handler';
import { CommandsService } from './commands.service';
import { ConfigModule } from '../config/config.module';
import { DiscordModule } from '../discord/discord.module';
import { HelpHandler } from './help/help.handler';
import { StatusHandler } from './status/status.handler';

@Module({
  imports: [ConfigModule, DiscordModule],
  providers: [
    CommandsService,
    PingHandler,
    InviteHandler,
    HelpHandler,
    StatusHandler,
  ],
  exports: [CommandsService],
})
export class CommandsModule {}
