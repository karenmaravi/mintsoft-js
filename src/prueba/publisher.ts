import { AMQP } from 'amqp-decorator'
import { some_event } from './some-event'
    
setImmediate(async() => {
   //await AMQP.init()
   await some_event.publish({x: 'vvvv'})
})