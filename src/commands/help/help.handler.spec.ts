import { Test, TestingModule } from '@nestjs/testing';
import { HelpHandler } from './help.handler';

describe('HelpHandler', () => {
  let service: HelpHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpHandler],
    }).compile();

    service = module.get<HelpHandler>(HelpHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respond on !help', () => {
    expect(service.test('!help')).toBeTruthy();
    expect(service.test('!HELP')).toBeTruthy();
  });
});
