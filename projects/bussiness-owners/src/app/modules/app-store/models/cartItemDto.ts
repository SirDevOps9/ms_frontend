import { Money } from "shared-lib";

export interface CartItemDto {
    id: string;
    app: string
    unitPrice: Money;
    subDomain : string
}