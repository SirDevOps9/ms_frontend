import { StockOutDetails } from "./stockOutDetailsDto";

export interface AddStockOutDto {
    
    receiptDate: string,
    sourceDocumentType?: string,
    sourceDocumentId: number,
    warehouseId: number,
    notes: string,
    stockOutDetails:StockOutDetails[]
  }