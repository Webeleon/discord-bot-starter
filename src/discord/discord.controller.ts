import { Controller, Get, Redirect } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Controller('discord')
export class DiscordController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/bot-invite')
  @Redirect('')
  invite() {
    const inviteUrl = `https://discordapp.com/oauth2/authorize?client_id=${this.configService.discordClientId}&scope=bot&permissions=2146958847`;
    return { url: inviteUrl };
  }
}
