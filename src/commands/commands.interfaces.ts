import { Message } from 'discord.js';

export interface CommandsInterfaces {
  execute: (message: Message) => Promise<void>;
  test: (content: string) => boolean;
  name: string;
  description?: string;
}
