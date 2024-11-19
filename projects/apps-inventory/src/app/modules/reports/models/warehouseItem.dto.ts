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
}

export interface WarehousesTables {
  warehouseName: string;
  uomName: string;
  itemId: string;
  itemName: string;
  itemCode: string;
  transactions: WarehouseTransactionsDto[];
  qtyBalance: string;
  itemCost: string;
  totalBalanceAmount: string;
}