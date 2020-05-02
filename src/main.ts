import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DiscordService } from './discord/discord.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const discordService = app.get(DiscordService);

  await app.listen(config.port, async () => {
    Logger.log(`Server listening on port ${config.port}`);
    await discordService.connect();
  });
}
bootstrap();
