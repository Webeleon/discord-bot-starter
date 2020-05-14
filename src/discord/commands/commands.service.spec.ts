import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';
import { PingHandler } from './ping/ping.handler';

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandsService, PingHandler],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
