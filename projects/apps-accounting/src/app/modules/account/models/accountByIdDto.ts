
export interface AccountByIdDto {
    id:number,
    accountCode:string,
    parentAccountCode:string,
    accountName:string,
    parentAccountName:string,
    accountLevel:string,
    hasNoChild:true,
    accountNature:string,
    accountSection:string,
    accountType:string,
    accountTags:string[],
    accountCurrency:string,
    accountActivation:string,
    periodicActiveFrom:string,
    periodicActiveTo:string
}