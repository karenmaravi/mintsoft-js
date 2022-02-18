import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //constructor(private readonly appService: AppService, @Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}

  // async onAplicationBootstrap(){
  //   await this.client.connect();
  // }

  @Get()
  getHello(): string {
    //this.appService.publishEvent();
    //this.client.emit('message_printed', 'Hello world');
    return 'Hello world printed'
  }
}
