// export interface ResponseCompanyDto {
//   id: number;
//   name: string;
//   website: string;
//   address: string;
//   countryCode: string;
//   countryName: string;
//   mobileNumberCode: string;
//   mobileNumber: string;
//   companyEmail: string;
//   industryId:number;
//   industryName: string;
//   currencyId:number;
//   currencyName: string;
//   planId:number;
//   planName:number;
//   isActive: boolean;
//   companyType: string;
// }


export interface ResponseCompanyDto {
  id: string;
  name: string;
  countryCode: string;
  parentId?: string;
  childrens?: ResponseCompanyDto[];
  countryName: string;
  mobileNumberCode: string;
  mobileNumber: string;
  companyEmail: string;
  subdomainId :number;
  subdomainName:number;
  isActive: boolean;
  companyType: string;
}