import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ScheduledService } from './scheduled/scheduled.service';

@Module({
  imports: [ConfigModule],
  providers: [DiscordService, ConfigService, ScheduledService],
  exports: [DiscordService],
  controllers: [DiscordController],
})
export class DiscordModule {}
