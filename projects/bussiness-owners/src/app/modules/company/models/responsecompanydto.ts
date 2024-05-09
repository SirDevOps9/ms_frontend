export interface ResponseCompanyDto {
  id: string;
  name: string;
  code: string;
  countryCode: string;
  parentId?: string;
  childrens?: ResponseCompanyDto[];
  countryName: string;
  mobileNumberCode: string;
  mobileNumber: string;
  companyEmail: string;
  subdomainId: string;
  subdomainName: number;
  isActive: boolean;
  companyType: string;
  commercialId?:string
}
