export interface ExportCurrencyConversionDto  {
    fromCurrencyName: string,
    fromCurrencyRate: number,
    toCurrencyName: string,
    reversedRate: number,
    note: string
  }