export interface AddSalesInvoice {
    invoiceDate: string
    description: string
    warehouseId: number
    warehouseName: string
    customerId: number
    customerName: string
    customerCreditLimit: number
    pricePolicyId: number
    currencyId: number
    currencyName: string
    currencyRate: number
    paymentTermId: number
    reference: string;
    salesManId : number;
    salesInvoiceDetails: SalesInvoiceDetail[]
  }
  
  export interface SalesInvoiceDetail {
    barCode: string
    barCodeId: number
    itemId: number
    itemCode: string
    itemName: string
    itemVariantId: number 
    itemVariantCode: string
    itemVariantNameEn: string
    itemVariantNameAr: string
    categoryId: number
    itemCategoryNameAr: string
    itemCategoryNameEn: string
    categoryType: string
    description: string
    uomId: string
    uomCode: string
    uomNameAr: string
    uomNameEn: string
    quantity: number
    cost: number
    discountPercentage: number
    discountAmount: number
    vatPercentage: number
    taxId: number
    notes: string
    invoiceEntryMode: string
    trackingType: string
    hasExpiryDate: boolean
    salesInvoiceTracking: SalesInvoiceTracking
  }
  
  export interface SalesInvoiceTracking {
    batchNo: string
    quantity: number
    hasExpiryDate: boolean
    expireDate: string
    serialId: string
    trackingType: string
  }
  