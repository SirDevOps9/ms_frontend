import { Money } from "shared-lib";

export interface AppDto {
    id: number;
    categoryId: number;
    categoryName?: string;
    name: string;
    description: string;
    logoId: string;
    price: Money;
    dependencies: AppDto[];
    appGallery?: string[];
}