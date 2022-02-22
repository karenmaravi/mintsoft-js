import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AmqpModule } from 'nestjs-amqp';
import { MicroService } from "./prueba.service";
import { MicroController } from "./prueba.controller";

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '../config/rabbitmq.ts')),
        AmqpModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('rabbitmq'),
            inject: [ConfigService],
        }),
    ],
    controllers: [MicroController],
    providers: [
        MicroService
    ]
})
export class PruebaModule {
    
}
