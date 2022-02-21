import { Consumer, Consume } from '@enriqcg/nestjs-amqp'
import { ExampleService } from './order.provider'

@Consumer('user') // event prefix
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Consume('created') // handler for user.created
  handleCreatedEvent(content: string) {
    console.log(JSON.parse(content))
    return false // message will not be acked
    return true //message will be acked
    // no return? -> message will be acked
  }

  // handler for user.updated.address
  @Consume({
    queueName: 'order_queue',
    noAck: false,
  })
  handleUpdatedAddressEvent(content: string) {
    const payload = JSON.parse(content)

    try {
      // pass data to your services
      console.log(payload)
      return true
      //this.exampleService.update(payload)
    } catch (e) {
      console.error(e)
      return false // message will not be acked
    }

    // message will be automatically acked
  }
}