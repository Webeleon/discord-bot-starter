import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CommandsService } from './commands/commands.service';
import { ScheduledService } from './scheduled/scheduled.service';
import { PingService } from './commands/ping/ping.service';

@Module({
  imports: [ConfigModule],
  providers: [
    DiscordService,
    ConfigService,
    CommandsService,
    ScheduledService,
    PingService,
  ],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
