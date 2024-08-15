export interface CreateInvitedUser {
    email: string;
    companyId: string;
    branchIds: string[];
    subdomainId: string;
    tenantLicenseId: number;
}
