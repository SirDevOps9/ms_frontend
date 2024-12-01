import { InvoiceEntryMode } from "./InvoiceEntryModeEnum";
import { AddInvoiceTrackingDto } from "./InvoiceTrackingDto";
import { TrackingType } from "./TrackTypeEnum";

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