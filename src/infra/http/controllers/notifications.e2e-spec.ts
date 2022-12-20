import { PrismaService } from '@infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
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

  it('should be able to count notifications from recipient', async () => {
    const recipientId = 'example-recipient-id';

    await prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você recebeu uma solicitação de amizade',
        category: 'social',
        recipientId,
      },
    });

    await prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você recebeu uma solicitação de amizade',
        category: 'social',
        recipientId,
      },
    });

    await prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você recebeu uma solicitação de amizade',
        category: 'social',
        recipientId: 'another-recipient-id',
      },
    });

    const { body } = await request(app.getHttpServer())
      .get(`/notifications/count/from/${recipientId}`)
      .expect(200);

    expect(body.count).toBe(2);
  });

  it('should be able to get notifications from recipient', async () => {
    const recipientId = 'example-recipient-id';

    await prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você recebeu uma solicitação de amizade',
        category: 'social',
        recipientId,
      },
    });

    await prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você recebeu uma solicitação de amizade',
        category: 'social',
        recipientId,
      },
    });

    const { body } = await request(app.getHttpServer())
      .get(`/notifications/from/${recipientId}`)
      .expect(200);

    expect(body.notifications).toHaveLength(2);
  });

  it('should be able to send a notification', async () => {
    const data = {
      content: 'Você recebeu uma solicitação de amizade',
      category: 'social',
      recipientId: 'example-recipient-id',
    };

    const { body } = await request(app.getHttpServer())
      .post('/notifications')
      .send(data)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201);

    expect(body.notification).toHaveProperty('id');
  });
});
