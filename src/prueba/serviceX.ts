import { AmqpService, AmqpResponder } from 'amqp-decorator'

@AmqpService()
export class ServiceX{

    @AmqpResponder()
    async some_method(){
        return 'This is response from remote service'
    }
}