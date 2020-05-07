import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { ServerService } from './server.service';
import { ConfigService } from '../config/config.service';
import { serverSchema } from './server.model';

describe('ServerService', () => {
  let service: ServerService;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongoURL, { useNewUrlParser: true }),
        MongooseModule.forFeature([{ name: 'Server', schema: serverSchema }]),
      ],
      providers: [ServerService],
    }).compile();

    service = module.get<ServerService>(ServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
