import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { OrderModule } from './order2/order.module';
import { OrderController } from "./order2/order.controller";
import { OrderService } from "./order2/order.service";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://95.111.235.214:32768/multivende_dev')
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
