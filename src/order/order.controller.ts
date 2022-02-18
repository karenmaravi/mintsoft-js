import { Controller, Post, Res, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { OrderService } from "./order.service";
import { CreateOrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}
   
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
        return 'HOLA'
    }

}
