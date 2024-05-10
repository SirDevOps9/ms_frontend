import { CompanyData } from "./comany-data";


export interface ResponseCompanyDto {
  data: CompanyData;
  children?: ResponseCompanyDto[];
}