import { SubsidiaryDto } from './subsidiary-dto';

export interface CompanyHierarchyDto {
  companyType: number;
  companyTypeName: string;
  subsidiaryCompanies?: SubsidiaryDto[];
  holdingCompany?: string;
  id: string;
}
