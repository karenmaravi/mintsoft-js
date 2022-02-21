import { Injectable } from '@nestjs/common'
import { AMQPService } from '@enriqcg/nestjs-amqp'

@Injectable()
export class ExampleService {
  constructor(private readonly amqpService: AMQPService) {}

  async sendEvent() {
    const amqp = this.amqpService.getChannel()

    amqp.publish('exchange_name', 'queue_name', Buffer.from(JSON.stringify({ test: true })))
  }
}