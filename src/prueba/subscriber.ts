import { AMQP, AmqpService } from 'amqp-decorator'
import { some_event } from './some-event'

@AmqpService()
class X{
    
    @some_event.subscribe()
    async event_process(data: {x: string}){
        console.log(data) // {x: 'vvv'}
    }
}
setImmediate(async() => {
   // await AMQP.init()
    new X() // You must instance class to listen events
 })