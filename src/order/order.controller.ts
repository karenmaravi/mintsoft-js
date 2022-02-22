import { Controller, Post, Res, Body, HttpStatus, Get, Param, Inject } from '@nestjs/common';
import { OrderService } from "./order.service";
import { CreateOrderDTO } from './order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy } from "@nestjs/microservices";
import { AmqpModule } from "nestjs-amqp";
import { Consumer, Consume } from '@enriqcg/nestjs-amqp'

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
        //@Inject('0RDER_SERVICE') private client: ClientProxy
        //private readonly exampleService: ExampleService
    ){}


    @Post('notify')
    async notify(@Res() res, @Body() createOrderDTO: CreateOrderDTO){
        const notify= await this.orderService.notify(createOrderDTO)
        console.log(notify)
        res.status(HttpStatus.OK).json({
            message: 'OK',
            order: notify
        })

    }

    @Get('getClient/:idClien')
    async getClient(@Res() res, @Param('idClien') idClien){
        const client = await this.orderService.getClient(idClien)
        res.status(HttpStatus.OK).json({
            message: 'OK',
            client: client
        })
    }

    @Get()
    getAll(){
       // this.client.emit('hello','Hellor from RabbitMQ');
       //this.orderService.sendEvent()
       this.orderService.all()
        return 'HOLA';
    }

}
