import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
 
export type OrderDocument = Order & Document;
 
@Schema({})
export class Order {
    @Prop({ unique: true })
    DeliveryOrderId: string;

    @Prop()
    MerchantId: string;

    @Prop()
    MerchanAppId: string;

    @Prop()
    OauthClient: object; //{_id: string, client_id: string}

    @Prop()
    resource: string;

    @Prop()
    attemps: number;

    @Prop()
    received: Date

    @Prop({default: 'P'})
    statusOrder: string;

    @Prop({default: Date.now})
    createdAt: Date
}
 
export const OrderSchema = SchemaFactory.createForClass(Order);