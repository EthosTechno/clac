import { PromoCodeModel, SubscriptionPaymentModel } from ".";

export class MySusbcriptionModel {
    constructor() {
        this.subsctiptionDate = new Date();
        this.renewalDate = new Date();
        this.subscriptionPaymentModel = new SubscriptionPaymentModel();
        this.promoCodeModel = new PromoCodeModel();
    }
    subsctiptionDate: Date;
    renewalDate: Date;
    subscriptionPaymentModel: SubscriptionPaymentModel;
    promoCodeModel: PromoCodeModel
}