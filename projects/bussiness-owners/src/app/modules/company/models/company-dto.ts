import { CompanyDataDto } from './comany-data-dto';

export interface CompanyDto {
  data: CompanyDataDto;
  children?: CompanyDto[];
}
