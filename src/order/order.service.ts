import {Injectable, Logger} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDTO } from "./order.dto";
import { Order, OrderDocument } from "./order.schema";
import { RabbitmqPublish } from "../utils/rabbitmq/rabbitmq.publish";
import { OrderClass } from './order';


@Injectable()
export class OrderService {
    constructor (
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private orderClass: OrderClass,
        private rabbitmqPublish: RabbitmqPublish,
    ) {}
  
    async addOrder(orderDTO: OrderDTO):Promise<Order>{
        const ord = await new this.orderModel(orderDTO)
        await ord.save()
        const mq = await this.rabbitmqPublish.publishAMQP('ex_order', '',orderDTO)
        return ord
    }


    async processStatus(idOrder : number): Promise<object>{
        const IDstatus = await this.orderClass.getIDStatus(idOrder);
        console.log(IDstatus)
        const detailStatus = await this.orderClass.getDetailStatus(IDstatus);
        const upd = await this.orderClass.updateOrder(idOrder, {detailStatus});
        console.log(upd)

        switch (IDstatus) {
            case 3: // CANCELLED
            case 4: // DESPATCHED
                await this.rabbitmqPublish.publishAMQP('ex_order_status_mdb', '',upd)
                break;

            default:
                await this.rabbitmqPublish.publishAMQP('ex_order_status_retry', '',upd)
                break;
        }


        return detailStatus
    }
}
