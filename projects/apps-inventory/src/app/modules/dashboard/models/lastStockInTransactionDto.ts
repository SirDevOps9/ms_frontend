export interface GetLastStockInTransactionDto {
  itemId: number;
  description: string;
  quantity: number;
  totalCost: number;
  createdDate: Date;
}
