import { Money } from 'shared-lib';

export interface AppDto {
  id: number;
  moduleId: number;
  categoryName?: string;
  nameEn: string;
  nameAr: string;
  description: string;
  logoId: string;
  price: Money;
  dependencies: AppDto[];
  appGallery?: string[];
}
