import { SubsidiaryDto } from './subsidiarydto';

export interface CompanyHierarchyDto {
  companyType: string;
  subsidiary: SubsidiaryDto[];
  id: string;
}
