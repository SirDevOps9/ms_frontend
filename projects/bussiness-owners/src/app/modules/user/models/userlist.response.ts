export interface UserListResponse {
  id?: string;
  name: string;
  email: string;
  license: string;
  identityId?: string;
  isActive: boolean;
  lastLoginDate: string;
  invitationStatus: number;
  photo?: string;
}


