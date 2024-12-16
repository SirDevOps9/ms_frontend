export interface SalesInvoiceListView {
  invoiceCode: string; 
  invoiceDate: string;
  dueDate: string;
  salesman: string;
  customerCode: string;
  customerName: string;
  warehouse: string;
  paymentTerms: string;
  creditLimit: number;
  relatedJournal: string;
  createdStockOut: boolean;
  totalQty: number;
  numberOfItems: number;
  totalAmount: number;
  discountAmount: number;
  totalAfterDiscount: number;
  vatAmount: number;
  totalAfterVat: number;
}
