import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const WEB_SERVER: string = 'http://localhost:3000';
const URLS = {
  /* Authentication Routes*/
  AUTH_LOGIN:           WEB_SERVER + '/auth/login',
  AUTH_LOGOUT:          WEB_SERVER + '/auth/logout',
  AUTH_RESET_PASSWORD:  WEB_SERVER + '/auth/resetpassword',
  
  /* User Routes */
  USERS_DETAILS:        WEB_SERVER + '/users/{$$}',

  /* Quiz Routes */
  QUIZ_CREATE:          WEB_SERVER + '/quizzes',
  QUIZ_GET_ALL:         WEB_SERVER + '/quizzes',
  QUIZ_GET:             WEB_SERVER + '/quizzes/{$$}',
  QUIZ_SCHEDULE:        WEB_SERVER + '/quizzes/{$$}/schedule',
  
  /* Domain Routes */
  DOMAIN_GET_CREATE:    WEB_SERVER + '/domains',
  DOMAIN_GET_ALL:       WEB_SERVER + '/domains',
  DOMAIN_GET:           WEB_SERVER + '/domains/{$$}',

  /* Question Routes */
  QUESTION_GET_ALL:     WEB_SERVER + '/quizzes/{$$}/questions',
  QUESTION_GET:         WEB_SERVER + '/quizzes/{$$}/questions/{$$}',
  QUESTION_CREATE:      WEB_SERVER + '/quizzes/{$$}/questions',
}

@Injectable()
export class RestClientService {
  static BASE: string = WEB_SERVER;
  static PATHS = URLS;
  
  constructor(private rclient: HttpClient) {  }

  public invokeRestCall(uri: string, params: string[]) {
    this.rclient.get(this.getURI(uri, params));
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
