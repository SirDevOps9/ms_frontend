import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginmodel';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { BaseService, APIResponse } from 'shared-lib';
import { TokenModel } from '../models/tokenmodel';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
 private loginAPI = 'Auth/Account';
 private updateLoginDateAPI = 'User/UpdateLoginDate';

  constructor(private baseService: BaseService) {}
  login(model: LoginModel): Observable<APIResponse<AuthenticationResponse>> {
    return this.baseService.post<APIResponse<AuthenticationResponse>>(
      `${this.loginAPI}/Login`,
      model
    );
  }
  updateLoginDate(): Observable<APIResponse<boolean>> {
    return this.baseService.post<APIResponse<boolean>>(
      `${this.updateLoginDateAPI}`,null  );
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
