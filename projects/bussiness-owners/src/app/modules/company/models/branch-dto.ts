export interface BranchDto {
  id?: string;
  code: string;
  nameEn: string;
  nameAr: string;
  branchRegion: string | null;
  branchCity: string | null;
  branchAddress: string | null;
  mobileNumberCode?: string | null;
  mobileNumber: string | null;
  branchEmail: string | null;
  countryCode?: string | null;
  companyId?: string;
  companyName: string;
  isActive: boolean;
}
