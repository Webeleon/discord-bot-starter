import { Test, TestingModule } from '@nestjs/testing';
import { stub } from 'sinon';
import { MessageEmbed } from 'discord.js';

import { StatusHandler } from './status.handler';

describe('StatusHandler', () => {
  let service: StatusHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusHandler],
    }).compile();

    service = module.get<StatusHandler>(StatusHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should respond to `status` case insensitive', () => {
    expect(service.test('status')).toBeTruthy();
    expect(service.test('STATUS')).toBeTruthy();
    expect(service.test('use status')).toBeFalsy();
  });

  it('respond with an embed in the channel', async () => {
    const message = {
      channel: {
        send: stub(),
      },
      client: {
        guilds: {
          cache: {
            array: () => [],
          },
        },
      },
    } as any;

    await service.execute(message);
    expect(message.channel.send.getCall(0).args[0]).toBeInstanceOf(
      MessageEmbed,
    );
  });
});
