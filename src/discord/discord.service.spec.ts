import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CommandsService } from './commands/commands.service';
import { PingHandler } from './commands/ping/ping.handler';

describe('DiscordService', () => {
  let service: DiscordService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [DiscordService, ConfigService, CommandsService, PingHandler],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
    configService = new ConfigService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should provide an invite link', () => {
    expect(service.getBotInviteLink()).toBe(
      `https://discordapp.com/oauth2/authorize?client_id=${configService.discordClientId}&scope=bot&permissions=1075305537`,
    );
  });
});
