import { Controller, Get, Redirect } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Controller('discord')
export class DiscordController {
  constructor(private readonly config: ConfigService) {}

  @Get('/bot-invite')
  @Redirect('')
  invite() {
    return { url: this.config.getBotInviteLink() };
  }
}
