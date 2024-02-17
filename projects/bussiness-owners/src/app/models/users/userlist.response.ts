export interface UserListResponse {
  id: number;
  name: string;
  email: string;
  countryId: number;
  phone: string;
  password: string;
  isMailSent: boolean;
  isConfirmed: boolean;
  roleId?: number;
  identityId?: string;
  typeId?: number;
  isActive:boolean;
}


