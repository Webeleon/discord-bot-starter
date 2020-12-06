import { Injectable } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class InviteHandler implements ICommandHandler {
  constructor(private readonly config: ConfigService) {}

  name = 'invite';
  regex = new RegExp(`^invite$`, 'i');

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    const embed = new MessageEmbed()
      .setDescription(this.config.getBotInviteLink())
      .setColor('BLUE');
    message.channel.send(embed);
  }
}
