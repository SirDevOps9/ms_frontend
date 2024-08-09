export interface AddPaymentMethodDto {
  name: string,
  paymentPlace: string,
  paymentMethodType: string,
  paymentMethodCommissionData:paymentMethodCommissionData
  }
  export interface paymentMethodCommissionData {
    bankId: number,
    bankAccountId: number,
    commissionType: string,
    commissionValue: number,
    commissionAccountId: number,
    allowVAT: boolean
  }
  