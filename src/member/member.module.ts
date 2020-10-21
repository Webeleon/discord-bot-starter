import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberService } from './member.service';
import { memberSchema } from './member.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: memberSchema }]),
  ],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
