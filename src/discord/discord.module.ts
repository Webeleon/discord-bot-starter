import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CommandsService } from './commands/commands.service';
import { ScheduledService } from './scheduled/scheduled.service';
import { PingHandler } from './commands/ping/ping.handler';

@Module({
  imports: [ConfigModule],
  providers: [
    DiscordService,
    ConfigService,
    CommandsService,
    ScheduledService,
    PingHandler,
  ],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
