import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { MessageEmbed } from 'discord.js';

import { HelpHandler } from './help.handler';
import { ServerModule } from '../../server/server.module';
import { ServerService } from '../../server/server.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test-utils/mongo/MongooseTestModule';

describe('HelpHandler', () => {
  let helpHandler: HelpHandler;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), ServerModule],
      providers: [HelpHandler],
    }).compile();

    helpHandler = testingModule.get<HelpHandler>(HelpHandler);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(helpHandler).toBeDefined();
  });

  it('should respond on !help', () => {
    expect(helpHandler.test('help')).toBeTruthy();
    expect(helpHandler.test('HELP')).toBeTruthy();
  });

  it('should respond an embed', async () => {
    const serverService = testingModule.get<ServerService>(ServerService);
    const message = {
      guild: {
        id: 'webeleon discord bot template',
      },
      channel: {
        send: sinon.stub(),
      },
    } as any;

    await helpHandler.execute(message);
    expect(message.channel.send.getCall(0).args[0]).toBeInstanceOf(
      MessageEmbed,
    );
  });
});
