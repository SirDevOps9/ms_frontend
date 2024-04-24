export interface CreateInvitedUser {
    email: string;
    companyId: string;
    branchIds: string[];
    subdomainId: number;
    tenantLicenseId: number;
}
