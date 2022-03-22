import { Injectable } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { RabbitmqPublish } from "../utils/rabbitmq/rabbitmq.publish";

@Injectable()
export class OrderConsumer {

  constructor(
    @InjectAmqpConnection() private readonly amqp, 
    private rabbitmqPublish: RabbitmqPublish,
  ) {
     this.consumerOrderAdd();
     this.consumerOrderStatus();
  }

  async consumerOrderAdd() {
    const channel = await this.amqp.createChannel();
    const confirmChannel = await this.amqp.createConfirmChannel();
    confirmChannel.prefetch(1);
    const v = confirmChannel.consume('orderAdd_queue', function (msg) {
      const dataJson= msg.content.toString()
      //const dataJson = JSON.parse(msg.content.toString()); 
      console.log('LOGICA DE REGISTRO DE ORDER')
      console.log(dataJson)
              
      confirmChannel.ack(msg);
                         
    }, {
        noAck: false
        //noAck: true
    });
    console.log(v);
  }

  async consumerOrderStatus() {
    //const channel = await this.amqp.createChannel();
    const confirmChannel = await this.amqp.createConfirmChannel();
    confirmChannel.prefetch(1);
    const v= confirmChannel.consume('orderStatus_queue', function (msg) {
      const dataJson= msg.content.toString()
      //const dataJson = JSON.parse(msg.content.toString()); 
      console.log('LOGICA DE CONSULTA DE ESTADO')
      console.log(dataJson)
      //const mq =  confirmChannel.sendToQueue('ex_order_status_mdb', Buffer.from(dataJson));
      const mq = confirmChannel.publish('ex_order_status_mdb', '',Buffer.from(JSON.stringify(dataJson)))
      //const mq =  this.rabbitmqPublish.publishAMQP('ex_mongodb', '',dataJson)  
      confirmChannel.ack(msg);
                         
    }, {
        noAck: false
        //noAck: true
    });
    console.log(v);
  }
}
