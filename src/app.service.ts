import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { ProductService } from "src/product/product.service";

@Injectable()
export class AppService {
  constructor(
     private orderService: OrderService,
     private productService: ProductService
  ){}

  async notify(notifyJson):Promise<object>{
    var notify;
    const typeProcess = 
        notifyJson.DeliveryOrderId ? 1 : // ORDER
        notifyJson.ProductId ? 2 : // PRODUCT
        null; // NINGUNO
    console.log('Tipo de proceso:',typeProcess)
    switch (typeProcess) {
        case 1:
          console.log('ORDER')
            notify = await this.orderService.addOrder(notifyJson);
            break;
        case 2:
          console.log('PRODUCT')
            notify = await this.productService.addProduct(notifyJson);
            
            break;
        default:
            break;
    }
    return notify
  }
}
