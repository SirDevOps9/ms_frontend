export interface ReturnInvoiceListView {
  id:number;
  invoiceCode: string;
  invoiceDate: string;
  customerCode: string;
  customerName: string;
  warehouse: string;
  relatedJournal: string;
  createdStockIn: boolean;
  totalQty: number;
  numberOfItems: number;
  totalAmount: number;
  vatAmount: number;
  totalAfterVat: number;
}
