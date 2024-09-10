export class SubscriptionPaymentModel {
    constructor() {
        this.cardNumber = '';
        this.expirationDate = '';
        this.cardHolderName = '';
        this.securityCode = '';
    }
    cardNumber: string;
    expirationDate: string;
    cardHolderName: string;
    securityCode: string;
}