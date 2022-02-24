import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from "./product.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductClass } from './product';
import { RabbitmqPublish } from "../utils/rabbitmq/rabbitmq.publish";
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AmqpModule } from 'nestjs-amqp';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Product.name, schema: ProductSchema}
    ]),
    ConfigModule.load(path.resolve(__dirname, 'config', '../utils/rabbitmq/rabbitmq.config.ts')),
    AmqpModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('rabbitmq'),
        inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductClass, RabbitmqPublish],
  exports: [ProductService]
})
export class ProductModule {}
