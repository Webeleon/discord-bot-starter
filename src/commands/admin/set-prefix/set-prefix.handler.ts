import { Injectable } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { ConfigService } from '../../../config/config.service';
import { ServerService } from '../../../server/server.service';

@Injectable()
export class SetPrefixHandler implements ICommandHandler {
  constructor(
    private readonly serverService: ServerService,
    private readonly configService: ConfigService,
  ) {}

  name = `${this.configService.adminPrefix} set prefix <prefix>`;
  description =
    'allow server admin to define a custom prefix for user commands';
  regex = new RegExp(`^${this.configService.adminPrefix} set prefix (.*)`, 'i');

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    await this.serverService.hasAdminRoleGuard(
      message.guild,
      message.author.id,
    );
    const [_, prefix] = message.content.match(this.regex);

    const savedPrefix = await this.serverService.setServerPrefix(
      message.guild.id,
      prefix,
    );

    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`Prefix setted to \`${savedPrefix}\``);
    message.channel.send(embed);
  }
}
