import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:password@localhost:15672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
}

bootstrap();
