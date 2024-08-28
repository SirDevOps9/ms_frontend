export interface BankPaymentMethods {
        id: number,
        name:string,
        paymentMethodType: string,
        commissionType: string,
        commissionValue: number,
        ratio:number,
    }