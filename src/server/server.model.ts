import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';

const configs = new ConfigService();
export const serverSchema = new mongoose.Schema(
  {
    serverId: String,
    adminRole: String,
    allowedChannels: [String],
    prefix: {
      type: String,
      default: configs.defaultPrefix,
    },
  },
  {
    timestamps: true,
  },
);
