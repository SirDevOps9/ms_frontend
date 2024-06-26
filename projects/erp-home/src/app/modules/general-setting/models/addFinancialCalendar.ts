export interface AddFinancialCalendar {
    name: string
    year: number
    fromDate: string
    toDate: string
    noOfExtraPeriods: number
    financialYearPeriods: FinancialYearPeriod[]
  }
  
  export interface FinancialYearPeriod {
    periodStart: string
    periodEnd: string
  }
  