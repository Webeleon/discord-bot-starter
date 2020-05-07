import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IServerDocument } from './server.interface';

@Injectable()
export class ServerService {
  constructor(
    @InjectModel('Server') private serverModel: Model<IServerDocument>,
  ) {}

  async getServer(serverId: string): Promise<IServerDocument> {
    const server = await this.serverModel.findOne({ serverId });
    if (!server) {
      return this.serverModel.create({
        serverId,
      });
    }
    return server;
  }
}
