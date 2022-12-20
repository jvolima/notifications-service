import { PrismaService } from '@infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('Notification controller (e2e)', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);

    await prisma.cleanDatabase();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to send a notification', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/notifications')
      .expect(200);

    console.log(body);
  });
});
