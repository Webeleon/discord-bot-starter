import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { Client } from 'discord.js';
import { CommandsService } from './commands/commands.service';

@Injectable()
export class DiscordService {
  client: Client;
  ready: boolean;

  constructor(
    private readonly config: ConfigService,
    private readonly commandService: CommandsService,
    ) {}

  connect() {
    this.client = new Client();

    this.client.on('ready', () => {
      Logger.log(`Discord connected with handle ${this.client.user.tag}`);
      this.commandService.register(this.client);
      this.ready = true;
    });

    this.client.login(this.config.discordToken);
  }

}
