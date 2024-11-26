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
  
  export interface AddInvoiceDetailDto {
    barCode?: string;
    barCodeId?: number;
    itemId: number;
    itemCode: string;
    itemVariantId: number;
    description?: string;
    uomId: string;
    uomName: string;
    quantity: number;
    cost: number;
    discountPercentage: number;
    discountAmount: number;
    vatPercentage?: number;
    taxId?: number;
    notes?: string;
    invoiceEntryMode: InvoiceEntryMode;
    trackingType: TrackingType;
    hasExpiryDate: boolean;
    invoiceTracking?: AddInvoiceTrackingDto;
  }
  
  export interface AddInvoiceTrackingDto {
    vendorBatchNo?: string;
    quantity: number;
    hasExpiryDate: boolean;
    expireDate?: Date;
    systemPatchNo?: string;
    serialId?: string;
    trackingType: TrackingType;
  }

  export enum InvoiceEntryMode {
    Manual = 'Manual',
    Imported = 'Imported',
    Scanned = 'Scanned',
  }
  
  export enum TrackingType {
    NoTracking = 'NoTracking',
    Serial = 'Serial',
    Batch = 'Batch',
  }