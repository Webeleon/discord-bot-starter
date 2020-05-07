import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServerService } from './server.service';
import { serverSchema } from './server.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Server', schema: serverSchema }]),
  ],
  providers: [ServerService],
})
export class ServerModule {}
