import { Money } from "shared-lib";

export interface AppDto {
    id: number;
    name: string;
    description: string;
    logoId: string;
    price: Money;
    dependencies: AppDto[];
}