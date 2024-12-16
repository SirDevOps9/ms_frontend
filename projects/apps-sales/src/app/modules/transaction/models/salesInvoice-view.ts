export interface SalesInvoiceView {
  code: string;
  invoiceDate: string;
  description: string;
  warehouseName: string;
  customerName: string;
  customerCode: string;
  customerCreditLimit: number;
  currencyName: string;
  currencyRate: number;
  paymentTermName: string;
  reference: string;
  stockOutId: number;
  stockOutCode: string;
  invoiceJournalId: number;
  invoiceJournalCode: string;
  totalOfQuantity:number
  totalAfterDiscount: number;
  totalVatAmount:number
  numberOfItems:number,
  grandTotal:number,
  salesInvoiceDetails: SalesInvoiceDetail[];
}

export interface SalesInvoiceDetail {
  barCode: string;
  itemCode: string;
  itemName: string;
  description: string;
  itemVariantCode: string;
  itemVariantNameAr: string;
  itemVariantNameEn: string;
  uomCode: string;
  uomNameAr: string;
  uomNameEn: string;
  quantity: number;
  cost: number;
  subCost: number;
  discountPercentage: number;
  discountAmount: number;
  netAmount: number;
  totalAfterDiscount: number;
  vatPercentage: number;
  vatAmount:number,
  grandTotal:number,
  invoiceTracking:number,
  hasExpiryDate:boolean,
  totalVatAmount:number
}
