import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';

const WEB_SERVER: string = 'http://localhost:3000';
const METHODS = {
  GET: 'get',
  DELETE: 'delete',
  POST: 'post',
}

const URLS = {
  /* Authentication Routes*/
  AUTH_LOGIN: {
    method: METHODS.POST,
    url: WEB_SERVER + '/auth/login',
  },

  AUTH_LOGOUT: {
    method: METHODS.DELETE,
    url: WEB_SERVER + '/auth/logout',
  },

  AUTH_RESET_PASSWORD: {
    method: METHODS.POST,
    url: WEB_SERVER + '/auth/resetpassword',
  },

  /* User Routes */
  USERS_DETAILS: {
    method: METHODS.GET,
    url: WEB_SERVER + '/users/{$$}',
  },

  /* Quiz Routes */
  QUIZ_CREATE: {
    method: METHODS.POST,
    url: WEB_SERVER + '/quizzes',
  },

  QUIZ_GET_ALL: {
    method: METHODS.GET,
    url: WEB_SERVER + '/quizzes',
  },

  QUIZ_GET: {
    method: METHODS.GET,
    url: WEB_SERVER + '/quizzes/{$$}',
  },

  QUIZ_GET_RESULT: {
    method: METHODS.GET,
    url: WEB_SERVER + '/quizzes/{$$}/attempts/{$$}/result',
  },

  QUIZ_SCHEDULE: {
    method: METHODS.POST,
    url: WEB_SERVER + '/quizzes/{$$}/schedule',
  },

  QUIZ_START: {
    method: METHODS.POST,
    url: WEB_SERVER + '/quizzes/{$$}/start',
  },

  /* Domain Routes */
  DOMAIN_CREATE: {
    method: METHODS.POST,
    url: WEB_SERVER + '/domains',
  },

  DOMAIN_GET_MENU: {
    method: METHODS.GET,
    url: WEB_SERVER + '/domains/menuitems',
  },

  DOMAIN_GET: {
    method: METHODS.GET,
    url: WEB_SERVER + '/domains/{$$}',
  },

  DOMAIN_GET_QUIZZES: {
    method: METHODS.GET,
    url: WEB_SERVER + '/domains/{$$}/quizzes/{$$}',
  },

  DOMAIN_GET_DESCRIPTION: {
    method: METHODS.GET,
    url: WEB_SERVER + '/domains/{$$}/description',
  },

  /* Question Routes */
  QUESTION_GET_ALL: {
    method: METHODS.GET,
    url: WEB_SERVER + '/quizzes/{$$}/questions',
  },

  QUESTION_GET: {
    method: METHODS.GET,
    url: WEB_SERVER + '/quizzes/{$$}/questions/{$$}',
  },

  QUESTION_CREATE: {
    method: METHODS.POST,
    url: WEB_SERVER + '/quizzes/{$$}/questions',
  },

  QUESTION_GET_NEXT: {
    method: METHODS.POST,
    url: WEB_SERVER + '/quizzes/{$$}/nextQuestion',
  },
}

@Injectable()
export class RestClientService {
  static BASE: string = WEB_SERVER;
  static URLS = URLS;
  public PATHS = URLS;

  constructor(private rclient: HttpClient) {}

  public call(restDto, query_params: string[] = [], body = {}) : Observable<any> {
    switch (restDto.method) {
      case METHODS.GET:
        return this.rclient.get(this.getURI(restDto.url, query_params));
      case METHODS.POST:
        return this.rclient.post(this.getURI(restDto.url, query_params), body);
      case METHODS.DELETE:
        return this.rclient.delete(this.getURI(restDto.url, query_params));
    }
    return null;
  }

  /* getURI
   *
   * Replaces all the variables with the URL parameters
   */
  private getURI(uri: string, params: string[]): string {
    params.forEach(param => {
      uri = uri.replace('{$$}', param);
      console.log("PARAM", uri);
    });
    return uri;
  }
}
