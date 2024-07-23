import { CompanyDataDto } from "./comany-data-dto";
import { CompanyDto } from "./company-dto";

export interface mappedData {
    data: CompanyDataDto;
    children?: CompanyDto[];
  }