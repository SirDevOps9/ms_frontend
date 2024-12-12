export interface InventoryFilterDto {
  [key: string]: string | string[] | undefined;
  fromDate?: string;
  toDate?: string;
  status?: string[];
  warehouseId?: string[];
  sourceDocumentType?: string[];
}
