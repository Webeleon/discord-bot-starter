import * as mongoose from 'mongoose';

export const memberSchema = new mongoose.Schema(
  {
    discordUserId: String,
    username: String,
  },
  {
    timestamps: true,
  },
);
