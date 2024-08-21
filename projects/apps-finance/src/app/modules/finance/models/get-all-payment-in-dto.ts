export interface GetAllPaymentInDto {
    code: string,
    date:string,
    paymentHub: string,
    paymentHubDetailId: string,
    branch: string,
    bankAccount: string
    sourceDocument: string
    relatedSourceJournal: string

  }