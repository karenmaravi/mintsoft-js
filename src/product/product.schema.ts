import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
 
export type ProductDocument = Product & Document;
 
@Schema({})
export class Product {
    @Prop({ unique: true })
    ProductId: String;

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
    statusProduct: string;

    @Prop({default: Date.now})
    createdAt: Date
}
 
export const ProductSchema = SchemaFactory.createForClass(Product);