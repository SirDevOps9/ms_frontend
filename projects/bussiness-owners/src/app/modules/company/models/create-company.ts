export interface CreateCompany {
  subdomainId: string;
  name: string;
  branchName: string;
  companyType: number;
  companyLogo: string;
  parentId?: string;
  countryCode:string;
  currencyId:number;

}
