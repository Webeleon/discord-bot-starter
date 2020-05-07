import * as mongoose from 'mongoose';

export const serverSchema = new mongoose.Schema(
  {
    serverId: String,
  },
  {
    timestamps: true,
  },
);
