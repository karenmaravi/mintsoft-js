import { createAmqpEvent } from 'amqp-decorator'
import { Channel } from 'amqplib';
export const some_event =  createAmqpEvent<{x: string}>('ex_order')