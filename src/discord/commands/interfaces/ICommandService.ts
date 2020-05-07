import { Message } from 'discord.js';

export interface ICommandService {
  execute: (message: Message) => Promise<void>;
  test: (content: string) => boolean;
}
