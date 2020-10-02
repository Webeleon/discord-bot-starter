import { Injectable } from '@nestjs/common';
import { Message } from 'discord.js';

import { ICommandHandler } from '../ICommandHandler';

@Injectable()
export class StatusHandler implements ICommandHandler {
  name: '!status';
  test(content: string): boolean {
    return /^!status/i.test(content);
  }

  async execute(message: Message): Promise<void> {
    message.channel.send({
      embed: {
        color: 'GREEN',
        fields: [
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
        ],
      },
    });
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
