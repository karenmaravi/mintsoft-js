import {Schema} from 'mongoose'

export const orderSchema = new Schema ({
    DeliveryOrderId: String,
    MerchantId: String,
    MerchanAppId: String,
    OauthClient: {_id: String, client_id: String},
    resource: String,
    attemps: Number,
    received: Date,
    statusOrder: {type: String, default: 'P'},
    createdAt: {type: Date,default: Date.now}
})

