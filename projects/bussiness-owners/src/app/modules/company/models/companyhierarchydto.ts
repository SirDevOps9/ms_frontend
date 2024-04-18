import { SubsidiaryDto } from './subsidiarydto';

export interface CompanyHierarchyDto {
  companyType: number;
  companyTypeName: string;
  subsidiaryCompanies?: SubsidiaryDto[];
  holdingCompany?: string;
  id: string;
}
