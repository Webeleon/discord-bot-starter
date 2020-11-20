import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { Message } from 'discord.js';

import { SetAdminRoleHandler } from './set-admin-role.handler';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { ServerModule } from '../../../server/server.module';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';
import { ServerService } from '../../../server/server.service';

describe(`SetAdminRoleHandler`, () => {
  const sandbox = sinon.createSandbox();
  let setAdminRoleHandler: SetAdminRoleHandler;
  let configService: ConfigService;
  let testModule: TestingModule;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [ServerModule, ConfigModule, rootMongooseTestModule()],
      providers: [SetAdminRoleHandler],
    }).compile();

    setAdminRoleHandler = testModule.get<SetAdminRoleHandler>(
      SetAdminRoleHandler,
    );
    configService = new ConfigService();
  });

  afterEach(async () => {
    sandbox.restore();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it(`should be defined`, () => {
    expect(setAdminRoleHandler).toBeDefined();
  });

  it(`should respond to '<admin prefix> set admin <role>'`, () => {
    expect(
      setAdminRoleHandler.test(
        `${configService.adminPrefix} set admin role <@&123123>`,
      ),
    ).toBeTruthy();
    expect(
      setAdminRoleHandler.test(
        `${configService.adminPrefix} SET admin role <@&123123123213>`,
      ),
    ).toBeTruthy();
    expect(
      setAdminRoleHandler.test(
        `asdasd ${configService.adminPrefix} set admin role <@&3114124>`,
      ),
    ).toBeFalsy();
  });

  it('call the serverservice and reply an embed', async () => {
    const CHAN_ID = '123123123';
    const message = {
      content: `${configService.adminPrefix} set admin role <@&${CHAN_ID}>`,
      channel: {
        send: sinon.stub(),
      },
      guild: {
        id: 'FAKE',
      },
      author: {
        id: '123123',
      },
    } as any;

    const serverService = testModule.get<ServerService>(ServerService);
    const setAdminRoleStub = sandbox.stub(serverService, 'setAdminRole');

    await setAdminRoleHandler.execute(message);
    expect(setAdminRoleStub.getCall(0).args[2]).toEqual(CHAN_ID);
    expect(message.channel.send.callCount).toEqual(1);

    const replyedEmbed = message.channel.send.getCall(0).args[0];
    expect(replyedEmbed.description).toMatch(new RegExp(CHAN_ID));
  });
});
