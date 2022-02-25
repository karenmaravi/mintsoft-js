import { Injectable, Logger, Get, Inject } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';

@Injectable()
export class ProductConsumer {

  constructor(@InjectAmqpConnection() private readonly amqp) {
    this.consumerProductAdd();
  }

  async consumerProductAdd() {
    const channel = await this.amqp.createChannel();
    const confirmChannel = await this.amqp.createConfirmChannel();
    confirmChannel.prefetch(1);
    const v= confirmChannel.consume('productAdd_queue', function (msg) {
      const dataJson= msg.content.toString()
      //const dataJson = JSON.parse(msg.content.toString()); 
      console.log('LOGICA DE REGISTRO DE PRODUCT')
      console.log(dataJson)
              
     // confirmChannel.ack(msg);
                         
    }, {
        noAck: false
        //noAck: true
    });
    console.log(v);
  }
}
