export class CreateProductDTO{
    readonly ProductId: string;
    readonly MerchantId: string;
    readonly MerchanAppId: string;
    readonly OauthClient: {
        readonly _id: string, 
        readonly client_id: string
    };
    readonly resource: string;
    readonly attemps: number;
    readonly received: String
    readonly createdAt: Date
}

