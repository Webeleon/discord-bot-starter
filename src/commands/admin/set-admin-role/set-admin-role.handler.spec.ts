import { Test, TestingModule } from '@nestjs/testing';

import { SetAdminRoleHandler } from './set-admin-role.handler';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../test-utils/mongo/MongooseTestModule';
import { ServerModule } from '../../../server/server.module';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';

describe(`SetAdminRoleHandler`, () => {
  let setAdminRoleHandler: SetAdminRoleHandler;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServerModule, ConfigModule, rootMongooseTestModule()],
      providers: [SetAdminRoleHandler],
    }).compile();

    setAdminRoleHandler = module.get<SetAdminRoleHandler>(SetAdminRoleHandler);
    configService = new ConfigService();
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
});
