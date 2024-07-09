import { UserInfoDto } from '.';

export interface TokenModel {
  id: string;
  token: string;
  refreshToken: string;
  expireToken: Date;
  expireRefreshToken: Date;
  userInfo: UserInfoDto;
}
