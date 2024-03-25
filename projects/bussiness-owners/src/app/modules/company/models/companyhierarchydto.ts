import { SubsidiaryDto } from "./subsidiarydto";

export interface CompanyHierarchyDto {
    companyType: number;
    subsidiary: SubsidiaryDto[];
    id: string;
}