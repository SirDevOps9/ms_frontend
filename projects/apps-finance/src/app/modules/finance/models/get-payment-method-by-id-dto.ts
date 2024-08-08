
export interface GetPaymentMethodByIdDto {
    id: number,
    code: string;
    name: string,
    paymentPlace: string,
    paymentMethodType: string,
    paymentMethodCommissionData:getpaymentMethodCommissionData
    }
    export interface getpaymentMethodCommissionData {
        bankId: number,
        bankAccountId: number,
        commissionType: string,
        commissionValue: number,
        commissionAccountId: number,
        allowVAT: boolean,
        currencyName: string
      }
    