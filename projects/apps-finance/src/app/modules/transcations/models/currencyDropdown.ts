export interface CurrencyDto {
  id: number;
  name: string;
  code: string;
  symbol: string;
  subUnit: string | null;
  countryName: string;
  createdOn: string;
}
