export enum CompanyTypes {
    Holding = 1,
    Subsidiary = 2,
  }

  export function getCompanyTypeLabel(companyType: CompanyTypes): string {
    switch (companyType) {
        case CompanyTypes.Holding:
            return 'Holding';
        case CompanyTypes.Subsidiary:
            return 'Subsidiary';
        default:
            return 'Unknown';
    }
}