import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const WEB_SERVER: string = "http://localhost:3000";
const URLS = {

  /* Authentication Routes*/
  AUTH_LOGIN:           WEB_SERVER + "/auth/login",
  AUTH_LOGOUT:          WEB_SERVER + "/auth/logout",
  AUTH_RESET_PASSWORD:  WEB_SERVER + "/auth/resetpassword",
  
  /* User Routes*/
  USERS_DETAILS:        WEB_SERVER + "/users/{$$}"
}

@Injectable()
export class RestClientService {
  static BASE: string = WEB_SERVER;
  static PATHS = URLS;
  
  constructor(private rclient: HttpClient) {  }

  /* getUserDetails
  *
  * Get the user details
  */
  public getUserDetails(userId: string) {
    this.rclient.get(this.getURI(URLS.USERS_DETAILS, [userId]));
  }

  /* getURI
   *
   * Replaces all the variables with the URL parameters
   */
  private getURI(uri: string, params: string[]): string {
    params.forEach(param => {
      uri = uri.replace('{$$}', param);
    });
    return uri;
  }
}
