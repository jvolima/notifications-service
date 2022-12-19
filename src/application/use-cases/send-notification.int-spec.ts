import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';

describe('Send notification integration', () => {
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);

    await prisma.cleanDatabase();
  });

  it('should be able to pass', () => {
    expect(1 + 1).toBe(2);
  });
});
