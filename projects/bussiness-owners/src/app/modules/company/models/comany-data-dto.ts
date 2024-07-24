export interface CompanyDataDto {
  id: string;
  name: string;
  code: string;
  countryCode: string;
  parentId?: string | null;
  countryName: string;
  mobileNumberCode: string;
  mobileNumber: string;
  companyEmail: string;
  companyType: string;
  subdomainId: string;
  subdomainName: string;
  commercialId?: string;
  isActive: boolean;
}
