import { commissiontype, paymentmethodtype, paymentplace } from "./enums";

export interface GetPaymentMethodByIdDto {
    id: number,
    code: string;
    name: string,
    paymentPlace: paymentplace,
    paymentMethodType: paymentmethodtype,
    paymentMethodCommissionData:getpaymentMethodCommissionData|null
    }
    export interface getpaymentMethodCommissionData {
        bankId: number,
        bankAccountId: number,
        commissionType: commissiontype|null,
        commissionValue: number|null,
        commissionAccountId: number|null,
        allowVAT: boolean,
        currencyName: string,
        taxId: number|null
      }
    