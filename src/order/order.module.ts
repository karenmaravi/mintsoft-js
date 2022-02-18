import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from "./order.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { OrderClass } from './order';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Order.name, schema: OrderSchema}
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderClass]
})
export class OrderModule {}
