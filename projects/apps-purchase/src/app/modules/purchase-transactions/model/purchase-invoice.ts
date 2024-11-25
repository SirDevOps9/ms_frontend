export interface IinvoiceDto {
  code: string;
  invoiceDate: string;
  vendorCode: string;
  vendorName: string;
  currencyRate: number;
  reference: string;
  paymentTermName: string;
  warehouseName: string;
  journalCode: string;
  stockInCode: string;
  totalAmount: number;
  discountAmount: number;
  totalAfterDiscount: number;
  vatAmount: number;
  totalAfterVatAmount: number;
  createdOn: string;
}
