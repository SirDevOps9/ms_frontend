export interface StockOutDetails {
        barCode: string,
        bardCodeId: number,
        itemId: number,
        itemVariantId: number,
        uomId: string,
        description: string,
        quantity: number,
        cost: number,
        notes: string,
        hasExpiryDate: true,
        stockOutEntryMode: string,
        trackingType: string,
        stockOutTracking: {
          trackingNo: string,
          hasExpiryDate: true,
          expireDate: string,
          trackingType: string
        }
  }