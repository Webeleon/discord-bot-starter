import { Controller, Get, Redirect } from '@nestjs/common';
import { DiscordService } from './discord.service';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Get('/bot-invite')
  @Redirect('')
  invite() {
    return { url: this.discordService.getBotInviteLink() };
  }
}
