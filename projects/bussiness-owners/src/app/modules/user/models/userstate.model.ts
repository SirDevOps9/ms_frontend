import { GetUserbyid } from './getuserbyid.response';
import { InvitedUserDto } from './inviteUserDto';

export interface UserState {
  loading?: boolean;
  activated?: boolean;
  userDetails?: GetUserbyid;
  invitedUserDetails?: InvitedUserDto;
}
