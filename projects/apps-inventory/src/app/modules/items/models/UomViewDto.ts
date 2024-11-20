export interface UonViewDto {
  id: number;
  nameAr: string;
  nameEn: string;
  uoMs: UomData[];
  systemUnitOfMeasureCategoryId?: number;
  shortName?: string;
}


export interface UomData {
  baseCalculation: string;
  baseReversal: string;
  calculation: string;
  code: string;
  factor: number;
  fromUnitOfMeasureId: number;
  fromUnitOfMeasureNameAr: string;
  fromUnitOfMeasureNameEn: string;
  id: number;
  incrementalId: number;
  isBaseUnit: boolean;
  nameAr: string;
  nameEn: string;
  reversal: string;
  shortName: string;
  systemUnitOfMeasureCategoryId: number;
  systemUnitOfMeasureId: number;
  uomCategoryId: number;
}
