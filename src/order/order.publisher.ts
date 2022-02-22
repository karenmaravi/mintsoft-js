import { Injectable, Logger, Get, Inject } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';

@Injectable()
export class MicroService {
  getHello(): string {
    return 'Hello World!4';
  }
  constructor(@InjectAmqpConnection() private readonly amqp) {
    this.startConnect();
  }
  async startConnect() {
    const channel = await this.amqp.createChannel();
    const confirmChannel = await this.amqp.createConfirmChannel();
    confirmChannel.prefetch(1);
    console.warn('********', confirmChannel);
    // const assert = await confirmChannel.assertQueue('prueba_queue', {
    //   durable: true
    // });
    //console.log(assert);
    const sent = await confirmChannel.sendToQueue(
      'prueba_queue',
      new Buffer(JSON.stringify({ hello: 'HOLAAAAAAAAAA' })),
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
