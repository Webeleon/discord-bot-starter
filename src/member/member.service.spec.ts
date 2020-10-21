import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberService } from './member.service';
import { ConfigService } from '../config/config.service';
import { memberSchema } from './member.model';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Member', schema: memberSchema }]),
      ],
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  afterAll(async () => closeInMongodConnection());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
