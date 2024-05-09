export interface AddCompanyPopupDto {
  subdomainId: string;
  name: string;
  branchName: string;
  companyType: number;
  companyLogo: string;
  parentId?: string;
}
