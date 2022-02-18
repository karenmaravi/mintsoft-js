import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  //constructor(@Inject('HELLO_SERVICE') private client: ClientProxy){}

  getHello(): string {
    return 'HOLA WORLD'
    //return this.client.send({cmd: 'greeting'}, 'Progressive Coder');
  }

  // async getHelloAsync() {
  //   const message= await this.client.send({cmd: 'greeting-async'},'Progressive Coder' );
  //   return message;
  // }

  // async publishEvent(){
  //   this.client.emit('cats_queue', {'bookName': 'The way of kings', 'author':'Brandon'})
  // }
}
