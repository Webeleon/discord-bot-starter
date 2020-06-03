import { Test, TestingModule } from '@nestjs/testing';
import { StatusHandler } from './status.handler';

describe('StatusHandler', () => {
  let service: StatusHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusHandler],
    }).compile();

    service = module.get<StatusHandler>(StatusHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
