
export interface GetPaymentMethodByIdDto {
    id: number,
    code: string;
    name: string,
    paymentPlace: number,
    paymentMethodType: number,
    paymentMethodCommissionData:getpaymentMethodCommissionData|null
    }
    export interface getpaymentMethodCommissionData {
        bankId: number,
        bankAccountId: number,
        commissionType: string|null,
        commissionValue: number|null,
        commissionAccountId: number|null,
        allowVAT: boolean,
        currencyName: string
      }
    