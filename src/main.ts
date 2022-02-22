import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@nestjs/microservices";
import {AMQP} from 'amqp-decorator'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/mintsoft'); 
  // const amqp_url = 'amqp://admin:password@localhost:15672'
  // setImmediate(async() => {
  //   await AMQP.init(amqp_url) // 
  //   // ... Other inited here
  // })

  //console.log(event)
  await app.listen(3000);

}

bootstrap();
