export interface IinvoiceDto {
  id?: number;
  code: string;
  invoiceDate: string;
  vendorCode: string;
  vendorName: string;
  currencyRate: number;
  reference: string;
  paymentTermName: string;
  warehouseName: string;
  invoiceJournalCode: string;
  stockInCode: string;
  totalNetAmount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
  vatAmount: number;
  totalAfterVatAmount: number;
  createdOn: string;
}

export interface viewInvoiceObj {
  code: string;
  invoiceDate: string;
  description: string;
  warehouseName: string;
  vendorName: string;
  vendorCode: string;
  currencyRate: number;
  paymentTermName: string;
  reference: string;
  stockInCode: string;
  invoiceJournalCode: any;
  invoiceDetails: InvoiceDetail[];
  numberOfItems: number;
  totalNetAmount: number;
  totalAfterDiscount: number;
  totalOfQuantity: number;
  totalDiscount: number;
  vatAmount: number;
  grandTotal: number;
}

export interface InvoiceDetail {
  barCode: string;
  itemCode: string;
  description: string;
  uomName: string;
  quantity: number;
  cost: number;
  subCost: number;
  discountPercentage: number;
  discountAmount: number;
  netAmount: number;
  totalAfterDiscount: number;
  vatPercentage: number;
  vatAmount: number;
  grandTotal: number;
  trackingType: string;
  hasExpiryDate: boolean;
  invoiceTracking: InvoiceTracking;
}

export interface InvoiceTracking {
  vendorBatchNo: string;
  expireDate: string;
  systemPatchNo: string;
  serialId?: string;
}
