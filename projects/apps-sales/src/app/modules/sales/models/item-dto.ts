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
  itemVariantNameAr: string;
  itemVariantNameEn: string;
  itemCategoryNameAr: string;
  itemCategoryNameEn: string;
  categoryType: string;
  hasExpiryDate: boolean;
  categoryId: number;
  taxId: number;
  taxRatio: number;
  price: number;
  isVatApplied:boolean;
  isSellingPriceIncludeVat:boolean;
  itemsUOM:any[]
  }