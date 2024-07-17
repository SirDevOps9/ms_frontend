import { AccountingInfo, AddressInfo, ContactInfo, FinancialInfo, LegalInfo } from "./addCustomerDefinitionDto"

 
  export interface EditCustomerDefintionsDto {
    id : string,
    name: string
    categoryId: number
    birthdate: string
    photo: string
    tagIds: number[]
    contactInfo: ContactInfo
    addressInfo: AddressInfo
    financialInfo: FinancialInfo
    legalInfo: LegalInfo
    accountingInfo: AccountingInfo
  }
  
