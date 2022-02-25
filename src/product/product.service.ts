import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDTO } from "./product.dto";
import { Product, ProductDocument } from "./product.schema";
import { ProductClass } from './product';
import { RabbitmqPublish } from "../utils/rabbitmq/rabbitmq.publish";

@Injectable()
export class ProductService {
    constructor (
        @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
        private ProductClass: ProductClass,
        private rabbitmqPublish: RabbitmqPublish
    ) {}


    async addProduct(createProductDTO: CreateProductDTO):Promise<Product>{
        const ord = await new this.ProductModel(createProductDTO)
        await ord.save()

        const mq = this.rabbitmqPublish.publishAMQP('ex_product', 'addProduct', createProductDTO)
        console.log('MQ:',mq)
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

    async insert(createProductDTO: CreateProductDTO):Promise<object>{
        const cliente = await this.ProductClass.getClient(createProductDTO.OauthClient._id);
       const prod = await this.ProductClass.getProduct(createProductDTO.MerchanAppId);
       return prod
    }

    async getStatus(idProduct): Promise<object>{
       const Product = await this.ProductClass.getStatus(idProduct);
        console.log(idProduct)

       const updateStatus = await this.ProductModel.findByIdAndUpdate(idProduct,CreateProductDTO, {statusProduct:'F'})

        return updateStatus
    }
}
