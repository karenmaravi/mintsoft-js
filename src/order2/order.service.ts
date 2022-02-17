import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDTO } from "./order.dto";
import { Order, OrderDocument } from "./order.schema";

@Injectable()
export class OrderService {
    constructor (
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        //private orderClass: OrderClass,
    ) {}

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
        //const cliente = await this.orderClass.getClient(createOrderDTO.OauthClient._id);
       // const prod = await this.orderClass.getProduct(createOrderDTO.MerchanAppId);
      //  return prod
        return createOrderDTO
    }

    async getStatus(idOrder): Promise<object>{
       // const order = await this.orderClass.getStatus(idOrder);
        console.log(idOrder)

       // const updateStatus = await this.orderModel.findByIdAndUpdate(idOrder,CreateOrderDTO, {statusOrder:'F'})

        return idOrder
    }
}
