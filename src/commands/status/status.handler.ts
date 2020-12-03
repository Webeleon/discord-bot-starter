import { Injectable } from '@nestjs/common';
import { Message, MessageEmbed } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../../package.json');

@Injectable()
export class StatusHandler implements ICommandHandler {
  name = '!status';
  regex = new RegExp(`^status$`, 'i');

  test(content: string): boolean {
    return this.regex.test(content);
  }

  async execute(message: Message): Promise<void> {
    const embed = new MessageEmbed().setColor('GREEN').addFields([
      {
        name: 'Version',
        value: version,
      },
      {
        name: 'Statistics',
        value: `
I'm in ${message.client.guilds.cache.array().length} servers.            
            `,
      },
      {
        name: 'Status',
        value: `
**Uptime** ${this.formatUptime()}
:white_check_mark: Bot 
            `,
      },
    ]);
    await message.channel.send(embed);
  }

  formatUptime(): string {
    const time = process.uptime();

    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  }
}
