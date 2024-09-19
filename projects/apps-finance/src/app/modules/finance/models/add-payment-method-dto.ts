export interface AddPaymentMethodDto {
  name: string,
  paymentPlace: string,
  paymentMethodType: string,
  paymentMethodCommissionData:paymentMethodCommissionData|null
  }
  export interface paymentMethodCommissionData {
    bankId: number|null,
    bankAccountId: number|null,
    commissionType: string|null,
    commissionValue: number|null,
    commissionAccountId: number|null,
    allowVAT: boolean,
    taxId:number|null

  }
  