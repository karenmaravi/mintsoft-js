import { Get, Controller } from '@nestjs/common';
import { MicroService } from './prueba.service';

@Controller('prueba')
export class MicroController {
  constructor(private readonly appService: MicroService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
  @Get('send')
  async send(): Promise<string> {
    this.appService.startConnect();
    return 'Sending!!!';
  }
}
