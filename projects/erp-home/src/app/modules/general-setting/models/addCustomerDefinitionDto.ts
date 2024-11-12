
    export interface AddCustomerDefinitionDto {
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
    
    export interface ContactInfo {
      contactPhone: string
      contactEmail: string
      contactMobileCode: string
      contactMobile: string
      contactWebsite: string
      contactFax: string
      contactPersonPhone: string
      contactPersonMobileCode: string
      contactPersonMobile: string
      contactPersonEmail: string
      contactPersonName: string
    }
    
    export interface AddressInfo {
      country: string
      state: string
      city: string
      street: string
      longitude: number
      latitude: number
      errorRadius: number
    }
    
    export interface FinancialInfo {
      paymentTermId: number
      pricePolicyId: number
      creditLimit: number
      currencyId: number
    }
    
    export interface LegalInfo {
      commercialId: string
      taxId: string
    }
    
    export interface AccountingInfo {
      receivableAccountId: number
      salesAccountId: number
      salesReturnAccountId: number
      discountAccountId: number
    }
    