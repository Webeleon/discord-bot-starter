import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Health checks on /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('ok');
  });

  it('Health check on /health', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('ok');
  });
});
