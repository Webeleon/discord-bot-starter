import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';

import { MessageEmbed } from 'discord.js';

import { PingHandler } from './ping.handler';

describe('PingService', () => {
  let service: PingHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingHandler],
    }).compile();

    service = module.get<PingHandler>(PingHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respond to the !ping command', () => {
    expect(service.test('ping')).toBe(true);
    expect(service.test('Ping')).toBe(true);
    expect(service.test('PING')).toBe(true);
    expect(service.test('PinG')).toBe(true);
  });

  it('Execute reply an embed', async () => {
    const message = {
      channel: {
        send: sinon.stub(),
      },
    } as any;

    await service.execute(message);

    expect(message.channel.send.getCall(0).args[0]).toBeInstanceOf(
      MessageEmbed,
    );
  });
});
