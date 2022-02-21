import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from "./order.schema";
import { ExampleService } from "./order.provider";
import { MongooseModule } from '@nestjs/mongoose';
import { OrderClass } from './order';
import { Transport, ClientsModule } from '@nestjs/microservices';
//import { AMQPModule } from '@enriqcg/nestjs-amqp'

import {ConfigModule, ConfigService} from 'nestjs-config';
import * as path from 'path';
import { AmqpModule } from 'nestjs-amqp';
import {  } from "../config/rabbitmq";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Order.name, schema: OrderSchema}
    ]),
    ConfigModule.load(path.resolve(__dirname, 'config', '../config/rabbitmq.ts')),
    AmqpModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('rabbitmq'),
      inject: [ConfigService],
    }),

    // AMQPModule.forRoot({
    //   hostname: 'localhost',
      
    //   // queues we use with @Consume will be created if-need-be
    //   assertQueues: true,
    //   exchange: {
    //     name: 'ex_order',
    //     // exchange will not be asserted (if-need-be)
    //     assert: false,
    //   },
    // }),
  //   ClientsModule.register([
  //       {
  //         name: '0RDER_SERVICE', transport: Transport.RMQ,
  //         options: {
  //           urls: ['amqp://admin:password@localhost:15672'],
  //           queue: 'order_queue',
  //           queueOptions: {
  //             durable: false
  //           }
  //         }
  //       }
  // //     ]),
    // AmqpModule.forRoot({
    //   name: 'rabbitmq',
    //   hostname: 'localhost',
    //   port: 15672,
    //   username: 'admin',
    //   password: 'password'
    // }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderClass]
})
export class OrderModule {}
