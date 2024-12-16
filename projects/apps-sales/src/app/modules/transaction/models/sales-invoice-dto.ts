export interface SalesInvoiceListView {
  id?:number
  code: string;
  invoiceDate: string;
  dueDate: string;
  salesman: string;
  customerCode: string;
  customerName: string;
  warehouseName: string;
  paymentTermName: string;
  customerCreditLimit: number;
  invoiceJournalCode: string;
  createdOn: boolean;
  totalQuantity: number;
  noOfItems: number;
  totalNetAmount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
  totalVatAmount: number;
  grandTotal: number;

}
