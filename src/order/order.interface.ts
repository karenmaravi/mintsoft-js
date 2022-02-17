import { Document } from "mongoose";

export interface Order extends Document {
    readonly DeliveryOrderId: string;
    readonly MerchantId: string;
    readonly MerchanAppId: string;
    readonly OauthClient: {_id: string, client_id: string};
    readonly attemps: number;
    readonly received: Date
    readonly statusOrder: string
    readonly createdAt: Date
}
