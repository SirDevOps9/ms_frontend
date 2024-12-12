export interface customerDto {
    id: number
    name: string
    code: string
    currencyId?: number
    currencyName?: string
    paymentTermId: number
    paymentTermName: string
    pricePolicyId?: number
    pricePolicyName?: string
    creditLimit?: number
  }


  export interface SalesInvoiceLookup {
    id: number
    description: string
    code: string
    customerId: string
    customerName: string
    customerCode: string
    currencyId: number
    currencyName: string
  }
  

  export interface ReturnSalesInvoiceObj {
    id: number
    code: string
    invoiceDate: string
    description: string
    warehouseId: number
    warehouseName: string
    customerId: number
    customerName: string
    currencyId: number
    currencyName: string
    currencyRate: number
    invoiceStatus: string
    reference: any
    stockOutId: any
    stockOutCode: any
    invoiceJournalId: any
    invoiceJournalCode: any
    salesInvoiceDetails: SalesInvoiceDetail[]
    invoiceHeaderId: number
  }
  
  export interface SalesInvoiceDetail {
    id: number
    barCode: any
    barCodeId: any
    itemId: number
    itemCode: string
    itemName: string
    itemVariantId: number
    itemVariantCode: string
    itemVariantNameAr: string
    itemVariantNameEn: string
    description: string
    uomId: string
    uomCode: string
    uomNameAr: string
    uomNameEn: string
    availableQuantity: number
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
    taxId: number
    notes: any
    invoiceEntryMode: string
    trackingType: string
    hasExpiryDate: boolean
    salesInvoiceTracking: SalesInvoiceTracking
  }
  
  export interface SalesInvoiceTracking {
    id: number
    batchNo: any
    quantity: number
    hasExpiryDate: boolean
    expireDate: string
    serialId: any
    trackingType: string
  }


  export interface AddSalesReturnDto {
    returnInvoiceDate: string
    salesInvoiceHeaderId: number
    warehouseName: string
    warehouseId: number
    description: string
    returnSalesInvoiceDetails: ReturnSalesInvoiceDetail[]
  }
  
  export interface ReturnSalesInvoiceDetail {
    toReturnQuantity: number
    salesInvoiceDetailId: number
  }
  