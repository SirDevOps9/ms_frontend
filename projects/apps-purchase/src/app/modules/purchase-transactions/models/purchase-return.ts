export interface PurchaseReturnInvoice {
  id?: number;
  code: string;
  returnInvoiceDate: Date;
  vendorCode: string;
  vendorName: string;
  warehouseName: string;
  invoiceJournalCode: string;
  stockOutCode: string;
  totalNetAmount: number;
  vatAmount: number;
  grandTotal: number;
  createdOn: Date;
}

export interface viewInvoiceReturnObj {
  code: string;
  returnInvoiceDate: string;
  description: string;
  warehouseName: string;
  vendorCode: string;
  vendorName: string;
  currencyRate: number;
  reference: string;
  invoiceJournalCode: string;
  stockOutCode: string;
  returnInvoiceDetails: ReturnInvoiceDetail[];
  numberOfItems: number;
  totalOfQuantity: number;
  totalNetAmount: number;
  vatAmount: number;
  grandTotal: number;
}

export interface ReturnInvoiceDetail {
  itemCode: string;
  description: string;
  uomName: string;
  remainQuantity: number;
  toReturnQuantity: number;
  quantity: number;
  cost: number;
  subCost: number;
  vatPercentage: number;
  grandTotal: number;
  trackingType: string;
  hasExpiryDate: boolean;
  returnInvoiceTracking: ReturnInvoiceTracking;
}

export interface ReturnInvoiceTracking {
  vendorBatchNo: string;
  expireDate: string;
  systemPatchNo: string;
  serialId: string;
}
