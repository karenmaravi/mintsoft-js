import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from "./order.schema";
import { RabbitmqPublish } from "../utils/rabbitmq/rabbitmq.publish";
import { OrderConsumer } from "./order.consumer";
import { MongooseModule } from '@nestjs/mongoose';
import { OrderClass } from './order';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AmqpModule } from 'nestjs-amqp';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Order.name, schema: OrderSchema}
    ]),
    ConfigModule.load(path.resolve(__dirname, 'config', '../utils/rabbitmq/rabbitmq.config.ts')),
    AmqpModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('rabbitmq'),
        inject: [ConfigService],
    }),
  ],
  controllers: [OrderController, ],
  providers: [OrderService, OrderClass, RabbitmqPublish, OrderConsumer],
  exports: [OrderService]
})
export class OrderModule {}
