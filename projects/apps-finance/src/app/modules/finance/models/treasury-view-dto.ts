export interface TreasuryViewDto {
    id: number
    code: string
    name: string
    currencyName: string
    accountName: string
    accountOpeningBalance :number
    treasuryOpeningBalance :number
    treasuryCurrentBalance :number
    branchesName: string[]
}