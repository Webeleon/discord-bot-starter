import { Injectable, Logger } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../../ICommandHandler';
import { ServerService } from '../../../server/server.service';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class SetAdminRoleHandler implements ICommandHandler {
  constructor(
    private readonly serverService: ServerService,
    private readonly configService: ConfigService,
  ) {}
  name = `${this.configService.adminPrefix} set admin role <@role>`;
  description =
    'set role with admin permissions on the bot for the current server';

  test(content: string): boolean {
    return new RegExp(
      `^${this.configService.adminPrefix} set admin role <@&.+>`,
      'i',
    ).test(content);
  }

  async execute(message: Message): Promise<void> {
    const [msg, roleId] = message.content.match(
      new RegExp(
        `^${this.configService.adminPrefix} SET ADMIN role <@&(.+)>`,
        'i',
      ),
    );
    Logger.debug(`captured role id ${roleId}`, 'setAdminRoleHandler');
    try {
      await this.serverService.setAdminRole(
        message.guild,
        message.author.id,
        roleId,
      );
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`<@&${roleId}> is now the admin role`);

      message.channel.send(embed);
    } catch (error) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`Failed to set the admin role`)
        .setDescription(error.message);

      message.channel.send(errorEmbed);
    }
  }
}
