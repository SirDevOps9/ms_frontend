import { AddInvoiceDetailDto } from "./addInvoiceDetailDto";

export interface AddInvoiceCommand {
    invoiceDate: Date;
    description?: string;
    warehouseId: number;
    warehouseName: string;
    vendorId: number;
    vendorName: string;
    currencyRate: number;
    paymentTermId: number;
    reference?: string;
    invoiceDetails: AddInvoiceDetailDto[];
  }