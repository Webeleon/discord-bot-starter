import { Test, TestingModule } from '@nestjs/testing';
import { DiscordController } from './discord.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

describe('Discord Controller', () => {
  let controller: DiscordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ConfigService],
      controllers: [DiscordController],
    }).compile();

    controller = module.get<DiscordController>(DiscordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
