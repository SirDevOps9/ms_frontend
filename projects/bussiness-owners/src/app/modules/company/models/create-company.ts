export interface CreateCompany {
  subdomainId: string;
  nameEn: string;
  nameAr: string;
  branchNameEn: string;
  branchNameAr: string;
  companyType: number;
  companyLogo: string;
  parentId?: string;
  countryCode:string;
  currencyId:number;

}
