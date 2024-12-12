export interface GetLastStockOutTransactionDto {
  itemId: number;
  description: string;
  quantity: number;
  totalCost: number;
  createdDate: Date;
}
