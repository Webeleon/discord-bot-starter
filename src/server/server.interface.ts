import { Document } from 'mongoose';

export interface IServer {
  serverId: string;
  adminRole: string;
  allowedChannels: string[];
  prefix: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServerDocument extends Document, IServer {}
