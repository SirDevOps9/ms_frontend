import { Money } from "shared-lib";

export interface CartItemDto {
    id: string;
    appName: string
    unitPrice: Money;
    subDomainName : string
}