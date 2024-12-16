export interface PaymentFilterDto {
  [key: string]: string | string[] | number[] | undefined;
  fromDate?: string;
  toDate?: string;
  PaymentHub: string;
  PaymentHubDetailId?: string[];
  BankAccountId?: number[];
  status?: string[];
  CurrencyId?: number[];
}
