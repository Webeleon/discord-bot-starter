import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IMemberDocument } from './member.interface';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private memberModel: Model<IMemberDocument>,
  ) {}

  async getMember(discordUserId: string): Promise<IMemberDocument> {
    const member = await this.memberModel.findOne({
      discordUserId,
    });
    if (!member) {
      return this.memberModel.create({
        discordUserId,
      });
    }
    return member;
  }
}
