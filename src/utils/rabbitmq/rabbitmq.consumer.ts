import { Injectable, Logger, Get, Inject } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';

@Injectable()
export class RabbitmqConsumer {

  constructor(@InjectAmqpConnection() private readonly amqp) {
    //this.publishAMQP();
  }

  async consumerAMQP(queue:string) {
    const channel = await this.amqp.createChannel();
    const confirmChannel = await this.amqp.createConfirmChannel();
    confirmChannel.prefetch(1);
    //console.warn('********', confirmChannel);
    // const assert = await confirmChannel.assertQueue('prueba_queue', {
    //   durable: true
    // });
    //console.log(assert);

    const v= confirmChannel.consume(queue, function (msg) {
      const dataJson = JSON.parse(msg.content.toString()); 
      console.log(dataJson)
              
      confirmChannel.ack(msg);
                         
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
