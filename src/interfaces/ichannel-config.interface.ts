export interface IChannelConfig {
  name: string;
  allowedMembers?: number;
  category?: string;
  guildId: string;
}

export interface IChannel {
  channelId: string;
  // this is an invite to the discord server pointing toward the channel
  inviteLink: string;
  // this link
  webUrl: string;
}
