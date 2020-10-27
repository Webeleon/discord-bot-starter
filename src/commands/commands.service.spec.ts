import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';
import { PingHandler } from './ping/ping.handler';
import { InviteHandler } from './invite/invite.handler';
import { HelpHandler } from './help/help.handler';
import { StatusHandler } from './status/status.handler';
import { ConfigModule } from '../config/config.module';
import { ServerModule } from '../server/server.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';
import { SetPrefixHandler } from './admin/set-prefix/set-prefix.handler';
import { SetAdminRoleHandler } from './admin/set-admin-role/set-admin-role.handler';
import { SetChannelHandler } from './admin/set-channel/set-channel.handler';
import { UnsetChannelHandler } from './admin/unset-channel/unset-channel.handler';

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), ConfigModule, ServerModule],
      providers: [
        CommandsService,

        // user handler
        PingHandler,
        InviteHandler,
        HelpHandler,
        StatusHandler,

        // admin handler
        SetAdminRoleHandler,
        SetPrefixHandler,
        SetChannelHandler,
        UnsetChannelHandler,
      ],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
