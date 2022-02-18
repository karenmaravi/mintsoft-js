import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { Transport, ClientsModule } from "@nestjs/microservices";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://95.111.235.214:32768/multivende_dev'),
    // ClientsModule.register([
    //   {
    //     name: 'HELLO_SERVICE', transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://admin:password@localhost:15672'],
    //       queue: 'messages',
    //       queueOptions: {
    //         durable: false
    //       }
    //     }
    //   }
    // ]),
    OrderModule,
    ProductModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
