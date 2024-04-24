export interface InvitedUserDto{
    id: string;
    email: string;
    companyId: string;
    branchIds: string[];
    subdomainId: number;
    subdomain: string;
    tenantLicenseId:number;   
}