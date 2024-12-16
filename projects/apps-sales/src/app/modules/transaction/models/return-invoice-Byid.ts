export interface IreturnInvoiceById {
  id: number
  code: string
  invoiceDate: string
  description: string
  warehouseId: number
  warehouseName: string
  customerId: number
  customerName: string
  customerCode: string
  customerCreditLimit: any
  pricePolicyId: any
  pricePolicyName: any
  currencyId: number
  currencyName: string
  currencyRate: number
  returnSalesInvoiceStatus: string
  paymentTermId: any
  paymentTermName: any
  reference: any
  stockInId: any
  stockInCode: any
  journalId: number
  journalCode: string
  salesInvoiceHeaderId: number
  salesManId: number
  salesManName: string
  returnSalesInvoiceDetails: ReturnInvoiceDetail[]
}

export interface ReturnInvoiceDetail {
  id: number
  barCode: any
  barCodeId: any
  itemId: number
  itemCode: string
  itemName: string
  itemVariantId: number
  categoryId: number
  itemCategoryNameAr: string
  itemCategoryNameEn: string
  categoryType: string
  itemVariantCode: string
  itemVariantNameAr: string
  itemVariantNameEn: string
  description: string
  uomId: string
  uomCode: string
  uomNameAr: string
  uomNameEn: string
  taxId: number
  notes: any
  invoiceEntryMode: string
  trackingType: string
  hasExpiryDate: boolean
  toReturnQuantity: number
  availableQuantity: number
  originalQuantity: number
  transactionRemainQuantity: number
  cost: number
  subCost: number
  discountPercentage: number
  discountAmount: number
  netAmount: number
  totalAfterDiscount: number
  vatPercentage: number
  vatAmount: number
  grandTotal: number
  localDiscountAmount: number
  localNetAmount: number
  localTotalAfterDiscount: number
  localVatAmount: number
  localGrandTotal: number
  salesInvoiceDetailId: number
  returnSalesInvoiceTracking?: ReturnSalesInvoiceTracking
}

export interface ReturnSalesInvoiceTracking {
  id: number
  batchNo: any
  quantity: number
  hasExpiryDate: boolean
  expireDate: string
  systemPatchNo: any
  serialId: any
  trackingType: string
}


  export interface updateReturnSalesInvice {
    id: number;
    returnInvoiceDate: string;
    description: string;
    warehouseId: number;
    warehouseName: string;
    returnSalesInvoiceDetails: IReturnSalesInvoiceDetail[]
  }
  
  export interface IReturnSalesInvoiceDetail {
    id: number
    toReturnQuantity: number
  }
  