export class CreateOrderDTO{
    readonly DeliveryOrderId: string;
    readonly MerchantId: string;
    readonly MerchanAppId: string;
    readonly OauthClient: string;
    readonly resource: string;
    readonly attemps: number;
    readonly received: Date
    readonly createdAt: Date
}

// {
//     readonly _id: string, 
//     readonly client_id: string
// }