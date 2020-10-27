import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { ServerModule } from '../../../server/server.module';
import { SetPrefixHandler } from './set-prefix.handler';
import { ConfigModule } from '../../../config/config.module';

describe('SetPrefixService', () => {
  let setPrefixHandler: SetPrefixHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), ServerModule, ConfigModule],
      providers: [SetPrefixHandler],
    }).compile();

    setPrefixHandler = module.get<SetPrefixHandler>(SetPrefixHandler);
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(setPrefixHandler).toBeDefined();
  });
});
