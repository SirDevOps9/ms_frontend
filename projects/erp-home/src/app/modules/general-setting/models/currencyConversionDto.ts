export interface CurrencyConversionDto  {
    id?: number,
    fromCurrencyName: string,
    fromCurrencyRate: number,
    toCurrencyName: string,
    reversedRate: number,
    note: string
  }

