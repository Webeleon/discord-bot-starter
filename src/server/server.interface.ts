import { Document } from 'mongoose';

export interface IServer {
  serverId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServerDocument extends Document, IServer {}
