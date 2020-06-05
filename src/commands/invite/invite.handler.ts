import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { CommandsInterfaces } from '../commands.interfaces';
import { DiscordService } from '../../discord/discord.service';

@Injectable()
export class InviteHandler implements CommandsInterfaces {
  constructor(private readonly discordService: DiscordService) {}

  name = 'invite';
  test(content: string): boolean {
    return /^!invite.*/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.reply(this.discordService.getBotInviteLink());
  }
}
