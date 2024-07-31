export interface GetPaymentTermById {
    id: number
    name: string
    code: string
    paymentTermLines: GetPaymentTermLineById[]
    
  }
  export interface GetPaymentTermLineById {
    id: number
    dueTermValue: number,
    afterValue: number,
    afterPeriod: string,
    note: string
    
  }