
export class SubscriptionModel {
    _id: string;
    subscription_id: string = '';
    title: string;
    sub_title: string;
    fr_title: string;
    fr_sub_title: string;
    amount: number;
    tax: number;
    type: string;
    image: string | ArrayBuffer;
    subscription_type: any = [];

}