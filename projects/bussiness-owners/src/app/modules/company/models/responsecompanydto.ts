// export interface ResponseCompanyDto {
//   id: string;
//   name: string;
//   code: string;
//   countryCode: string;
//   parentId?: string;
//   childrens?: ResponseCompanyDto[];
//   countryName: string;
//   mobileNumberCode: string;
//   mobileNumber: string;
//   companyEmail: string;
//   subdomainId: number;
//   subdomainName: number;
//   isActive: boolean;
//   companyType: string;
//   commercialId?:string
// }
export interface CompanyData {
  id: string;
  name: string;
  code: string;
  countryCode: string;
  parentId: string | null;
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

export interface ResponseCompanyDto {
  data: CompanyData;
  children?: ResponseCompanyDto[];
}