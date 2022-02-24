import { Injectable, Logger, Get, Inject } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';
//import  * as rabbit  from "amqplib";
import { Connection } from "amqplib";

@Injectable()
export class RabbitmqPublish {

  constructor(
    //@InjectAmqpConnection() private readonly amqp,
    @InjectAmqpConnection() private readonly amqp: Connection,
   // @connect('amqp://localhost') private readonly open
  ) {
    //this.publishAMQP();
  }

  //rabbit.connect('amqp://admin:admin@rabbitmq/')

  async publishAMQP(exchange:string, key:string, data:object) {
    console.log(`PUBLISH AMQP - EXCHANGE:${exchange}`)
    const confirmChannel = await this.amqp.createConfirmChannel();
    const sent = await confirmChannel.publish(exchange, key,Buffer.from(JSON.stringify(data)))
    console.log(sent);
    await confirmChannel.close()
    return sent
  }

  async productorAMQP(queue:string, data:object) {
    console.log(`PRODUCT AMQP - QUEUE:${queue}`)
    const confirmChannel = await this.amqp.createConfirmChannel();
    const assert = await confirmChannel.assertQueue(queue, {
      durable: true
    });
    const sent = await confirmChannel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(data)),
      {
        persistent: true,
      },
      (error, ok) => {
        if (error) {
          console.log('Message dropped!');
        } else {
          console.log('Message OK');
        }
      },
    );
    console.log(sent);
    return sent
  }

 // publish(msg: any) {}
}
