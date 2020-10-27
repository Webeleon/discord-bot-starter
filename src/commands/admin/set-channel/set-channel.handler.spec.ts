import { Test, TestingModule } from '@nestjs/testing';
import { SetChannelHandler } from './set-channel.handler';
import { ServerModule } from '../../../server/server.module';
import { ConfigModule } from '../../../config/config.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';

describe('SetChannelService', () => {
  let service: SetChannelHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServerModule, ConfigModule, rootMongooseTestModule()],
      providers: [SetChannelHandler],
    }).compile();

    service = module.get<SetChannelHandler>(SetChannelHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
