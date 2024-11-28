export interface AddPurchaseInvoiceDto {
    invoiceDate: string
    description: string
    warehouseId: number
    warehouseName: string
    vendorId: number
    vendorName: string
    currencyRate: number
    paymentTermId: number
    reference: string
    invoiceDetails: InvoiceDetail[]
  }
  
  export interface InvoiceDetail {
    barCode: string
    barCodeId: number
    itemId: number
    itemCode: string
    itemVariantId: number
    description: string
    uomId: string
    uomName: string
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
    invoiceTracking: InvoiceTracking
  }
  
  export interface InvoiceTracking {
    vendorBatchNo: string
    quantity: number
    hasExpiryDate: boolean
    expireDate: string
    systemPatchNo: string
    serialId: string
    trackingType: string
  }
  