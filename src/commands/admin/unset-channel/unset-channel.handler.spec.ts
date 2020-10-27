import { Test, TestingModule } from '@nestjs/testing';
import { UnsetChannelHandler } from './unset-channel.handler';
import { ServerModule } from '../../../server/server.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { ConfigModule } from '../../../config/config.module';

describe('UnsetChannelService', () => {
  let service: UnsetChannelHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServerModule, ConfigModule, rootMongooseTestModule()],
      providers: [UnsetChannelHandler],
    }).compile();

    service = module.get<UnsetChannelHandler>(UnsetChannelHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
