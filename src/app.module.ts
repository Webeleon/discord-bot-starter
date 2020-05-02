import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [ConfigModule, DiscordModule, ScheduleModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
