export interface ExportCompanyDto {
    name: string;
    code: string;
    countryName: string;
    mobileNumber: string;
    companyEmail: string;
    companyType: string;
    commercialId?: string;
    taxId?: string;
    isActive: boolean;
  }