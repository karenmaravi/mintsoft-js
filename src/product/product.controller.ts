import { Controller, Post, Res, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { ProductService } from "./product.service";
import { CreateProductDTO } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private ProductService: ProductService){}
   
    @Post('notify')
    async notify(@Res() res, @Body() createProductDTO: CreateProductDTO){
        const notify= await this.ProductService.notify(createProductDTO)
        console.log(notify)
        res.status(HttpStatus.OK).json({
            message: 'OK',
            Product: notify
        })

    }

    @Get('getClient/:idClien')
    async getClient(@Res() res, @Param('idClien') idClien){
        const client = await this.ProductService.getClient(idClien)
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
