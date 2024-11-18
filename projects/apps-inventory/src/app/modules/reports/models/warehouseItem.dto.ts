export interface WarehouseTransactionsDto {
  id: string;
  transactionName: string;
  transactionCode: string;
  serial: string;
  batchNumber: string;
  expiryDate: Date;
  in: {
    qty: number;
    cost: number;
    total: number;
  };
  out: {
    qty: number;
    cost: number;
    total: number;
  };
  qtyBalance: number;
  itemCost: number;
  totalBalanceAmount: number;
}

export interface WarehousesTables {
  warehouseName: string;
  itemId: string;
  transactions: WarehouseTransactionsDto[];
}
