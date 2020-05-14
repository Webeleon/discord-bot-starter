import { Test, TestingModule } from '@nestjs/testing';
import { PingHandler } from './ping.handler';

describe('PingService', () => {
  let service: PingHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingHandler],
    }).compile();

    service = module.get<PingHandler>(PingHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respond to the !ping command', () => {
    expect(service.test('!ping')).toBe(true);
    expect(service.test('!Ping')).toBe(true);
    expect(service.test('!PING')).toBe(true);
    expect(service.test('!PinG')).toBe(true);
  });
});
