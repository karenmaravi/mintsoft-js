import { Injectable, Logger, Get, Inject } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';

@Injectable()
export class OrderConsumer {

  constructor(
    @InjectAmqpConnection() private readonly amqp,
  ) {
    this.consumerNotify();
  }

  async consumerNotify() {
    console.log('CONSUMIDOR NOTIFY')
    const channel = await this.amqp.createChannel();
    const confirmChannel = await this.amqp.createConfirmChannel();
    confirmChannel.prefetch(1);

    const v = confirmChannel.consume('notify_queue', function (msg) {
      const dataJson= msg.content.toString()
      //const dataJson = JSON.parse(msg.content.toString()); 
      console.log(dataJson)
      console.log(typeof(dataJson))

      // INSERTAR A ALMACEN

      // INSERTAR A COLA PARA VERIFICAR ESTADO
      var mq
      const typeProcess = 
        dataJson.DeliveryOrderId ? 1 : // ORDER
        dataJson.ProductId ? 2 : // PRODUCT
        null; // NINGUNO

      switch (typeProcess) {
        case 1:
          mq = this.rabbitmqPublish.publishAMQP('order_queue', dataJson)
          console.log('MQ:',mq)
          break;

        default:
          break;
      }
      
      //confirmChannel.ack(msg);
                         
    }, {
      noAck: false
      //noAck: true
    });

    
    console.log(v);
    // await channel.publish(
    //   'amq.topic',
    //   'my_queue',
    //   new Buffer(JSON.stringify({ hello: 'dung' })),
    //   { persistent: true },
    //   () => {},
    // );
  }
 // publish(msg: any) {}
}
