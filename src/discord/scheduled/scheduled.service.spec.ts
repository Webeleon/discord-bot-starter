import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledService } from './scheduled.service';

describe('ScheduledService', () => {
  let service: ScheduledService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledService],
    }).compile();

    service = module.get<ScheduledService>(ScheduledService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
