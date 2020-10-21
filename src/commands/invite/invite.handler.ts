import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class InviteHandler implements ICommandHandler {
  constructor(private readonly config: ConfigService) {}

  name = 'invite';
  test(content: string): boolean {
    return /^!invite.*/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.channel.send(this.config.getBotInviteLink());
  }
}
