import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServerService } from './server.service';
import { serverSchema } from './server.model';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Server', schema: serverSchema }]),
  ],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
