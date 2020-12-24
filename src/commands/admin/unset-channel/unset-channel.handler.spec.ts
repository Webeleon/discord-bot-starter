import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { MessageEmbed } from 'discord.js';

import { UnsetChannelHandler } from './unset-channel.handler';
import { ServerModule } from '../../../server/server.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';
import { ServerService } from '../../../server/server.service';

describe('UnsetChannelHandler', () => {
  let service: UnsetChannelHandler;
  let config: ConfigService;
  let serverService: ServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServerModule, ConfigModule, rootMongooseTestModule()],
      providers: [UnsetChannelHandler],
    }).compile();

    service = module.get<UnsetChannelHandler>(UnsetChannelHandler);
    config = module.get<ConfigService>(ConfigService);
    serverService = module.get<ServerService>(ServerService);
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should respond to 'ADMIN_PREFIX unset channel'`, () => {
    expect(service.test(`${config.adminPrefix} unset channel`)).toBeTruthy();
    expect(service.test(`${config.adminPrefix} UNSET CHANNEL`)).toBeTruthy();
    expect(
      service.test(`example: ${config.adminPrefix} unset channel`),
    ).toBeFalsy();
  });

  it(`should reply an embed`, async () => {
    sinon.stub(serverService, 'unsetChannel').returns(
      Promise.resolve({
        allowedChannels: [],
      } as any),
    );
    const message = {
      guild: {
        id: 'WEBELEON',
      },
      author: {
        id: 'super jaguar',
      },
      channel: {
        send: sinon.stub(),
      },
    } as any;

    await service.execute(message);
    expect(message.channel.send.getCall(0).args[0]).toBeInstanceOf(
      MessageEmbed,
    );
  });
});
