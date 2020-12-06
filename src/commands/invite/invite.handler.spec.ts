import { Test, TestingModule } from '@nestjs/testing';
import { MessageEmbed } from 'discord.js';
import { stub } from 'sinon';

import { InviteHandler } from './invite.handler';
import { ConfigModule } from '../../config/config.module';

describe('InviteHandler', () => {
  let service: InviteHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [InviteHandler],
    }).compile();

    service = module.get<InviteHandler>(InviteHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should test on !invite', () => {
    expect(service.test('invite')).toBeTruthy();
    expect(service.test('INVITE')).toBeTruthy();
    expect(service.test('inVite')).toBeTruthy();
  });

  it('respond with an embed', async () => {
    const message = {
      channel: {
        send: stub(),
      },
    } as any;

    await service.execute(message);

    expect(message.channel.send.getCall(0).args[0]).toBeInstanceOf(
      MessageEmbed,
    );
  });
});
