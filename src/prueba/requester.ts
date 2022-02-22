import { AMQP, AmqpRemoteService } from 'amqp-decorator'
import { ServiceX } from './serviceX'


setImmediate(async() => {
    //await AMQP.init()
    const service_x = await AmqpRemoteService<ServiceX>(ServiceX)
    console.log(await service_x.some_method()) // =>  This is response from remote service
    })


