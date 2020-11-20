import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';

import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { ServerModule } from '../../../server/server.module';
import { SetPrefixHandler } from './set-prefix.handler';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';
import { ServerService } from '../../../server/server.service';

describe('SetPrefixService', () => {
  const sandbox = sinon.createSandbox();

  let setPrefixHandler: SetPrefixHandler;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), ServerModule, ConfigModule],
      providers: [SetPrefixHandler],
    }).compile();

    setPrefixHandler = testingModule.get<SetPrefixHandler>(SetPrefixHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(setPrefixHandler).toBeDefined();
  });

  it('should call the server service and send an embed', async () => {
    const config = testingModule.get<ConfigService>(ConfigService);
    const message = {
      content: `${config.adminPrefix} set prefix coco`,
      author: {
        id: '123123',
      },
      guild: {
        id: '345345',
      },
      channel: {
        send: sinon.stub(),
      },
    } as any;

    const serverService = testingModule.get<ServerService>(ServerService);
    sandbox.stub(serverService, 'hasAdminRoleGuard');
    const setServerPrefixStub = sandbox
      .stub(serverService, 'setServerPrefix')
      .returns(Promise.resolve('coco'));

    await setPrefixHandler.execute(message);
    expect(setServerPrefixStub.getCall(0).args[1]).toEqual('coco');

    const replyedEmbed = message.channel.send.getCall(0).args[0];
    expect(replyedEmbed.description).toMatch(/coco/);
  });
});
