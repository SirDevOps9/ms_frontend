export interface AddCompanyPopupDto {
  subdomainId: number;
  name: string;
  branchName: string;
  companyType: number;
  companyLogo: string;
  parentId?: string;
}
