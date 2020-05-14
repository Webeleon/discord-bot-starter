import { Test, TestingModule } from '@nestjs/testing';
import { InviteHandler } from './invite.handler';
import { DiscordModule } from '../../discord.module';

describe('InviteHandler', () => {
  let service: InviteHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DiscordModule],
      providers: [InviteHandler],
    }).compile();

    service = module.get<InviteHandler>(InviteHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should test on !invite', () => {
    expect(service.test('!invite')).toBeTruthy();
    expect(service.test('!INVITE')).toBeTruthy();
    expect(service.test('!Invite ')).toBeTruthy();
    expect(service.test('!inVite')).toBeTruthy();
  });
});
