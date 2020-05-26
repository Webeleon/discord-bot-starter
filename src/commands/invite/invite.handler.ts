import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandService } from '../interfaces/ICommandService';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class InviteHandler implements ICommandService {
  constructor(private readonly config: ConfigService) {}

  name = 'invite';
  test(content: string): boolean {
    return /!invite.*/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply(this.config.getBotInviteLink());
  }
}
