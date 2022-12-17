import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['romantic-marlin-11033-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cm9tYW50aWMtbWFybGluLTExMDMzJNd5iKB17RXWlhAZOSgPtwpsosjhcI7Lhag',
          password:
            '3M40DlsHFZ79SibQw-3iPx1lfxfe56L-U5uLwKAsPrcFg3MFKeHaB-e0PHSHR5IhRtRCVA==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
