import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken, NbAuthModule, NbAuthStrategy } from '@nebular/auth';

@Injectable()
export class UserService {

  private user = null;
  
  constructor(private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }
        else {
          this.user = null;
        }

      });
  }
  
  getUser(): Observable<any> {
    return observableOf(this.user);
  }
}
