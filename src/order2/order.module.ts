import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from "./order.schema";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'order', schema: OrderSchema}
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
