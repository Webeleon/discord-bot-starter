import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';
import { PingHandler } from './ping/ping.handler';
import { InviteHandler } from './invite/invite.handler';
import { DiscordModule } from '../discord/discord.module';

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DiscordModule],
      providers: [CommandsService, PingHandler, InviteHandler],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
