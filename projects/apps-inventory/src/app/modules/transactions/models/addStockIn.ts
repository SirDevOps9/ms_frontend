export interface AddStockIn {
    receiptDate: string
    sourceDocumentType: string
    sourceDocumentId: number
    warehouseId: number
    notes: string
    stockInDetails: StockInDetail[]
  }
  
  export interface StockInDetail {
    barCode: string
    bardCodeId: number
    description: string
    itemId: number
    itemVariantId: number
    uomId: string
    quantity: number
    cost: number
    notes: string
    stockInEntryMode: string
    trackingType: string
    stockInTracking: StockInTracking
  }
  
  export interface StockInTracking {
    vendorBatchNo: string
    expireDate: string
    systemPatchNo: string
    serialId: string
    trackingType: string
  }
  