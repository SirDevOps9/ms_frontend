export interface ItemDto {
  itemId: number;
  id?: number;
  itemCode: string;
  itemName: string;
  uomId: number;
  uomCode: string;
  uomNameAr: string;
  uomNameEn: string;
  itemVariantId: number;
  itemVariantCode: string;
  itemVariantName: string;
  itemCategoryNameAr: string;
  itemCategoryNameEn: string;
  categoryId: number;
  taxId: number;
  itemsUOM:any[]
  }