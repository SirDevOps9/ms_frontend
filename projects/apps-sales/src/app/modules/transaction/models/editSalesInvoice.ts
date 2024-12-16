export interface EditSalesInvoice {
    code: string
    invoiceDate: string
    description: string
    warehouseName: string
    customerName: string
    customerCode: string
    customerCreditLimit: number
    currencyName: string
    currencyRate: number
    paymentTermName: string
    reference: string
    stockOutId: number
    stockOutCode: string
    invoiceJournalId: number
    invoiceJournalCode: string
    salesInvoiceDetails: SalesInvoiceDetails[]
    numberOfItems: number
    totalNetAmount: number
    totalAfterDiscount: number
    totalOfQuantity: number
    totalDiscount: number
    totalVatAmount: number
    grandTotal: number
  }
  
  export interface SalesInvoiceDetails {
    barCode: string
    itemCode: string
    itemName: string
    description: string
    itemVariantCode: string
    itemVariantNameAr: string
    itemVariantNameEn: string
    uomCode: string
    uomNameAr: string
    uomNameEn: string
    quantity: number
    cost: number
    subCost: number
    discountPercentage: number
    discountAmount: number
    netAmount: number
    totalAfterDiscount: number
    vatPercentage: number
    vatAmount: number
    grandTotal: number
    trackingType: string
    hasExpiryDate: boolean
    invoiceTracking: InvoiceTracking
  }
  
  export interface InvoiceTracking {
    batchNo: string
    expireDate: string
    serialId: string
  }
  