export interface AddTransaction {
    code: string;  
    date: string;  
    transactionType: 'IN' | 'OUT';  
    transactionStatus: 'Draft' | 'Completed' | 'Pending';  
    sourceDocumentType: string;  
    sourceDocumentNumber: string;  
    warehouseId: number;  
    note: string;  
    transactionDetails: TransactionDetail[];  
  }
  
  export interface TransactionDetail {
    id?: number;  
    itemBarcodeId: number;  
    itemId: number;
    itemVariantId: number;  
    uomId: number;  
    cost: number;  
    subTotal: number;  
    note: string; 
    batchNumber: string; 
    batchExpiryDate: string;  
    transactionDetailSerialNumbers: SerialNumberDetail[]; 
  }
  
  export interface SerialNumberDetail {
    id?: number;  
    serialNumber: string; 
  }
  