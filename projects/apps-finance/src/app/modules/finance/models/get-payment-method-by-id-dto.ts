import { paymentMethodCommissionData } from "./add-payment-method-dto";

export interface GetPaymentMethodByIdDto {
    id: number,
    code: string;
    name: string,
    paymentPlace: string,
    paymentMethodType: string,
    paymentMethodCommissionData:paymentMethodCommissionData
    }
    