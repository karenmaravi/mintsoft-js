import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, InjectModel } from '@nestjs/mongoose'
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AmqpModule } from 'nestjs-amqp';
import { RabbitmqPublish } from './utils/rabbitmq/rabbitmq.publish';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://95.111.235.214:32768/multivende_dev'),
    ConfigModule.load(path.resolve(__dirname, 'config', './utils/rabbitmq/rabbitmq.config.ts')),
    AmqpModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('rabbitmq'),
      inject: [ConfigService],
    }),
     OrderModule,
     ProductModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, RabbitmqPublish
  ],
})
export class AppModule {}
