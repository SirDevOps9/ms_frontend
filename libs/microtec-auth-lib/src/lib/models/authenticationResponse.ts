export interface AuthenticationResponse {
  isAuthenticated: boolean;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}
