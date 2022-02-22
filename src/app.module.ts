import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { Transport, ClientsModule } from "@nestjs/microservices";
import { PruebaModule } from './prueba/prueba.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AmqpModule } from 'nestjs-amqp';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://95.111.235.214:32768/multivende_dev'),
    ConfigModule.load(path.resolve(__dirname, 'config', './config/rabbitmq.ts')),
    AmqpModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('rabbitmq'),
      inject: [ConfigService],
    }),
    OrderModule,
    ProductModule,
    PruebaModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
