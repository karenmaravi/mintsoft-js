import {Injectable, Logger} from '@nestjs/common';
import {InjectAmqpConnection} from 'nestjs-amqp';
import {  } from 'nestjs-amqp';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDTO } from "./order.dto";
import { Order, OrderDocument } from "./order.schema";
import { OrderClass } from './order';
import { Connection } from 'amqplib';
//import { AMQPService } from '@enriqcg/nestjs-amqp'
//import { AMQPService } from 'nestjs-amqp'


@Injectable()
export class OrderService {
    constructor (
        @InjectAmqpConnection()
    private readonly amqp: Connection,
       // private readonly amqpService: AMQPService,
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private orderClass: OrderClass,
    ) {
        //this.startConnect();
    }

    // async publish(message: string)  {
    //     await this.amqp.createChannel((err, channel) => {
    //       if (err != null) {
    //         Logger.alert(err, 'TestProvider');
    //       }
    //       channel.assertQueue('test_queue_name');
    //       channel.sendToQueue('test_queue_name', message);
    //     });
    //   }
      
    // async sendEvent() {
    //     const amqp = this.amqpService.getChannel()
    
        
    //     const v= await amqp.publish('ex_order', 'order_name', Buffer.from(JSON.stringify({ hola: 'HOLAAAAAAAA' })))
    //     console.log(v)
    //   }
    
//       @Publish("queue_name")
//   async publish() {
//     return "Send this to 'queue queue_name'";
//   }
  
    async notify(createOrderDTO: CreateOrderDTO):Promise<Order>{
        const ord = await new this.orderModel(createOrderDTO)
        await ord.save()
        return ord
    }

    async getClient(idClie: string):Promise<object>{
        const arrayClientes = [
            {id: '1',name: 'Jesica'}, 
            {id: '2',name: 'Daniel'},
            {id: '3',name: 'Victor'},
        ]
        const clieFound = arrayClientes.find(element => element.id = idClie);
        return clieFound
    }

    async getProduct(idProd: string): Promise<object>{
        const arrayProd = [
            {id: '1',name: 'Jesica'}, 
            {id: '2',name: 'Daniel'},
            {id: '3',name: 'Victor'},
        ]
        const prodFound = arrayProd.find(element => element.id = idProd);
        return prodFound
    }

    async insert(createOrderDTO: CreateOrderDTO):Promise<object>{
        const cliente = await this.orderClass.getClient(createOrderDTO.OauthClient._id);
       const prod = await this.orderClass.getProduct(createOrderDTO.MerchanAppId);
       return prod
    }

    async getStatus(idOrder): Promise<object>{
       const order = await this.orderClass.getStatus(idOrder);
        console.log(idOrder)

       const updateStatus = await this.orderModel.findByIdAndUpdate(idOrder,CreateOrderDTO, {statusOrder:'F'})

        return updateStatus
    }
    all(){
        return 'HOla'
    }
}
