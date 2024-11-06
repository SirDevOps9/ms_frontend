
  
  export interface addBarcode {
    id: number
    barcodes: Barcode[]
  }
  
  export interface Barcode {
    itemId: number
    id: number
    barcode: string
    uomId: string
    itemVariantId: number
    sku: string
    isActive: boolean
  }
  