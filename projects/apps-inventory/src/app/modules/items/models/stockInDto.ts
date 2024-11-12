

  import { StockOutStatus } from "./stockOutStatus";

export interface StockInDto {
  id: number,
  code: string,
  receiptDate: string,
  notes: string,
  sourceDocumentId: number,
  warehouseId: number,
  warehouseName: string,
  stockInStatus: StockOutStatus,
  journalCode: string,
  isReserved: boolean,
  createdOn: string
  }
