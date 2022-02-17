import { Controller, Post, Res, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { OrderService } from "./order.service";
import { CreateOrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
    constructor(private productoService: OrderService){}
   
    @Post('/notify')
    async notify(@Res() res, @Body() createOrderDTO: CreateOrderDTO){
        const notify= await this.productoService.notify(createOrderDTO)
        res.status(HttpStatus.OK).json({
            message: 'OK',
            order: notify
        })

    }

    @Get('/getClient')
    async getClient(@Res() res, @Param() idClien){
        const client = await this.productoService.getClient(idClien)
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
