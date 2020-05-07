import { Document } from 'mongoose';

export interface IMember {
  discordUserId: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMemberDocument extends IMember, Document {}
