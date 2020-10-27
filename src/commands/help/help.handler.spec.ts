import { Test, TestingModule } from '@nestjs/testing';
import { HelpHandler } from './help.handler';
import { ServerModule } from '../../server/server.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test-utils/mongo/MongooseTestModule';

describe('HelpHandler', () => {
  let service: HelpHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), ServerModule],
      providers: [HelpHandler],
    }).compile();

    service = module.get<HelpHandler>(HelpHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respond on !help', () => {
    expect(service.test('help')).toBeTruthy();
    expect(service.test('HELP')).toBeTruthy();
  });
});
