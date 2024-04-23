export interface UserListResponse {
  id: string;
  name: string;
  email: string;
  identityId?: string;
  isActive: boolean;
  lastLoginDate: string;
  invitationStatus: number;
}
