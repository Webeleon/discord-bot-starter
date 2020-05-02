import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

@Injectable()
export class ConfigService {
  public readonly port: number;
  public readonly discordToken: string;
  public readonly discordClientId: string;

  constructor() {
    config();
    this.port = parseInt(process.env.PORT) || 5000;
    this.discordToken = process.env.DISCORD_API_TOKEN || '';
    this.discordClientId = process.env.DISCORD_CLIENT_ID || '';
  }
}
