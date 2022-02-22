import {AMQP} from 'amqp-decorator'
import { ServiceX } from './serviceX'

setImmediate(async() => {
    //await AMQP.init()
    new ServiceX()
})