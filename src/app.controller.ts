import { Controller, Get, Inject, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Console } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('notify')
    async notify(@Res() res, @Body() notifyJson:object){
      console.log('Input: ',notifyJson)
        const notify = await this.appService.notify(notifyJson)
        console.log('Output:',notify)
        res.status(HttpStatus.OK).json({
          message: 'OK',
          data: notify
        })

    }
}
