export interface EditVendorCommand {
    id: number
    name: string;
    photo?: string;
    birthDate?: Date;
    vendorCategoryId?: number;
    vendorInformation?: EditVendorInformationDto;
    vendorAddress?: EditVendorAddressDto;
    vendorLegal?: EditVendorLegalDto;
    vendorFinancial?: EditVendorFinancialDto;
    vendorAccounting?: EditVendorAccountingDto;
    vendorTagIds?: number[];
  }
  export interface EditVendorInformationDto {
    id: number
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

  export interface EditVendorAddressDto {
    id: number
    state?: string;
    street?: string;
    longitude?: number;
    latitude?: number;
    radius?: number;
    countryId: string;
    cityId: number;
  }

  export interface EditVendorLegalDto {
    id: number
    taxId?: string;
    commercialId?: string;
  }
  export interface EditVendorFinancialDto {
    id: number
    paymentTermId?: number;
    pricePolicyId?: number;
    creditLimit?: number;
    currencyId?: number;
  }

  export interface EditVendorAccountingDto {
    id: number
    payableAccountId?: number;
    purchaseAccountId?: number;
    purchaseReturnAccountId?: number;
    discountAccountId?: number;
  }