import { Test, TestingModule } from '@nestjs/testing';
import { SetChannelHandler } from './set-channel.handler';
import { ServerModule } from '../../../server/server.module';
import { ConfigModule } from '../../../config/config.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { ConfigService } from '../../../config/config.service';

describe('SetChannelService', () => {
  let service: SetChannelHandler;
  let adminPrefix: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServerModule, ConfigModule, rootMongooseTestModule()],
      providers: [SetChannelHandler],
    }).compile();

    service = module.get<SetChannelHandler>(SetChannelHandler);
    const config = module.get<ConfigService>(ConfigService);
    adminPrefix = config.adminPrefix;
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('response to <admin prefix> set channel', () => {
    expect(service.test(`${adminPrefix} set channel`)).toBeTruthy();
    expect(service.test(`${adminPrefix} SET CHANNEL`)).toBeTruthy();
    expect(service.test(`do: ${adminPrefix} set channel`)).toBeFalsy();
  });
});
