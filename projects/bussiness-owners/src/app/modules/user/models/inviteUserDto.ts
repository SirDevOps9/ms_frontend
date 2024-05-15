export interface InvitedUserDto{
    id: string;
    email: string;
    companyId: string;
    branchIds: string[];
    subdomainId: string;
    subdomain: string;
    tenantLicenseId:number;   
}