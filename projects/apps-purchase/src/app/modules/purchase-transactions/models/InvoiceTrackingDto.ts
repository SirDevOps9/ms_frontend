import { TrackingType } from "./TrackTypeEnum";

export interface AddInvoiceTrackingDto {
    vendorBatchNo?: string;
    quantity: number;
    hasExpiryDate: boolean;
    expireDate?: Date;
    systemPatchNo?: string;
    serialId?: string;
    trackingType: TrackingType;
  }