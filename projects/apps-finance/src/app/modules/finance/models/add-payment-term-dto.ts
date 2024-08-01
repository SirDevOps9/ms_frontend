export interface AddPaymentTermDto {
    name: string
    paymentTermLines :AddPaymentTermLinesDto[]
  }
  export interface AddPaymentTermLinesDto {
    dueTermValue: number,
    afterValue:number,
    afterPeriod: string,
    note: string
  }
  