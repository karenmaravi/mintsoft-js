import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
 
export type OrderDocument = Order & Document;
 
@Schema({})
export class Order {
    @Prop({ unique: true })
    DeliveryOrderId: String;

    @Prop()
    MerchantId: String;

    @Prop()
    MerchanAppId: String;

    @Prop(raw({
        _id: { type: String },
        client_id: { type: String }
      }))
    OauthClient: Record<string, any>;

    @Prop()
    resource: String;

    @Prop()
    attemps: Number;

    @Prop()
    received: String;

    @Prop({default: 'P'})
    statusOrder: string;

    @Prop({default: Date.now})
    createdAt: Date
}
 
export const OrderSchema = SchemaFactory.createForClass(Order);