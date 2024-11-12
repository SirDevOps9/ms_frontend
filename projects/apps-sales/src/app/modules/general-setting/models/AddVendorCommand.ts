export interface AddVendorCommand {
    name: string;
    photo?: string;
    birthDate?: Date;
    vendorCategoryId?: number;
    vendorInformation?: AddVendorInformationDto;
    vendorAddress?: AddVendorAddressDto;
    vendorLegal?: AddVendorLegalDto;
    vendorFinancial?: AddVendorFinancialDto;
    vendorAccounting?: AddVendorAccountingDto;
    vendorTagIds?: number[];
  }
  export interface AddVendorInformationDto {
    contactPhone?: string;
    contactMobileCode?: string;
    contactMobile?: string;
    contactFax?: string;
    contactEmail?: string;
    contactWebsite?: string;
    contactPersonName?: string;
    contactPersonMobileCode?: string;
    contactPersonMobile?: string;
    contactPersonPhone?: string;
    contactPersonEmail?: string;
  }
  export interface AddVendorAddressDto {
    state?: string;
    street?: string;
    longitude?: number;
    latitude?: number;
    radius?: number;
    countryId: string;
    cityId: number;
  }
  export interface AddVendorLegalDto {
    taxId?: string;
    commercialId?: string;
  }
  export interface AddVendorFinancialDto {
    paymentTermId?: number;
    pricePolicyId?: number;
    creditLimit?: number;
    currencyId?: number;
  }
  export interface AddVendorAccountingDto {
    payableAccountId?: number;
    purchaseAccountId?: number;
    purchaseReturnAccountId?: number;
    discountAccountId?: number;
  }