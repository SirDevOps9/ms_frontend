export interface editFinancialCalndar {
    id: number
    name: string
    code: string
    year: number
    fromDate: string
    toDate: string
    noOfExtraPeriods: number
    noOfPeriods: number
    status: boolean
    periods: Period[]
  }
  
  export interface Period {
    id: number
    month: number
    year: number
    periodStart: string
    periodEnd: string
    status: boolean
  }
  