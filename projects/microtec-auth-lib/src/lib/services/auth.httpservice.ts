import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginmodel';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { HttpService, APIResponse } from 'shared-lib';
import { TokenModel } from '../models/tokenmodel';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private loginAPI = 'Auth/Account';
  private updateLoginDateAPI = 'User/UpdateLoginDate';

  constructor(private baseService: HttpService) {}
  login(model: LoginModel): Observable<APIResponse<AuthenticationResponse>> {
    return this.baseService.post<APIResponse<AuthenticationResponse>>(
      `${this.loginAPI}/Login`,
      model
    );
  }
  updateLoginDate(): Observable<APIResponse<string>> {
    return this.baseService.post<APIResponse<string>>(
      `${this.updateLoginDateAPI}`,
      null
    );
  }

  refreshToken(
    model: TokenModel
  ): Observable<APIResponse<AuthenticationResponse>> {
    return this.baseService.post<APIResponse<AuthenticationResponse>>(
      `${this.loginAPI}/refresh-token`,
      model
    );
  }
}
