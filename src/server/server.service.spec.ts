import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { ServerService } from './server.service';
import { ConfigService } from '../config/config.service';
import { serverSchema } from './server.model';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';

describe('ServerService', () => {
  let service: ServerService;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Server', schema: serverSchema }]),
      ],
      providers: [ServerService],
    }).compile();

    service = module.get<ServerService>(ServerService);
  });

  afterAll(async () => closeInMongodConnection());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
