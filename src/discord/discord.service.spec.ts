import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

describe('DiscordService', () => {
  let service: DiscordService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [DiscordService, ConfigService],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
    configService = new ConfigService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
