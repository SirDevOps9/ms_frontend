export interface GetVendorById {
    id: number;
    name: string;
    code: string;
    photo?: string;
    birthDate?: string;
    vendorCategory?: VendorCategory;
    vendorInformation?: VendorInformation;
    vendorAddress?: VendorAddress;
    vendorLegal?: VendorLegal;
    vendorFinancial?: VendorFinancial;
    vendorAccounting?: VendorAccounting;
    vendorTags?: number[];
  }
  
  export interface VendorCategory {
    id: number;
    code: string;
    name: string;
  }
  
  export interface VendorInformation {
    id: number;
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
  
  export interface VendorAddress {
    id: number;
    state?: string;
    street?: string;
    longitude?: number;
    latitude?: number;
    radius?: number;
    countryCode?: string;
    countryNameEn?: string;
    countryNameAr?: string;
    cityId?: number;
    cityName?: string;
  }
  
  export interface VendorLegal {
    id: number;
    taxId?: string;
    commercialId?: string;
  }
  
  export interface VendorFinancial {
    id: number;
    paymentTermId?: number;
    paymentTermName?: string;
    pricePolicyId?: number;
    ppricePolicyName?: string;
    creditLimit?: number;
    currencyId?: number;
    currencyName?: string;
  }
  
  export interface VendorAccounting {
    id: number;
    payableAccountId?: number;
    payableAccountName?: string;
    purchaseAccountId?: number;
    purchaseAccountName?: string;
    purchaseReturnAccountId?: number;
    purchaseReturnAccountName?: string;
    discountAccountId?: number;
    discountAccountName?: string;
  }
  
