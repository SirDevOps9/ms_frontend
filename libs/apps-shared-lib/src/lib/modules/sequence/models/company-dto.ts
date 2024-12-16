export interface CurrentuserInfoDto {
  companies: CompanyInUserInfo[];
}

export interface CompanyInUserInfo {
  id: string;
  name: string;
  code: string;
  currencyId: number;
  currencyName: string;
  companyType: string;
  currencyCode: string;
  branches: BranchInUserInfo[];
}

export interface BranchInUserInfo {
  id: string;
  name: string;
  isDefault: boolean;
}
