import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
  RestClientService,
  UserService,
} from './utils';

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [

  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',

        token: {
          class: NbAuthJWTToken
        },

        baseEndpoint: '',
        login: {
          alwaysFail: false,
          endpoint: RestClientService.PATHS.AUTH_LOGIN,
          method: 'post',
          redirect: {
            success: '/pages',
            failure: null,
          },
          defaultErrors: ['Invalid email or password, please try again.'],
        },
        logout: {
          alwaysFail: false,
          endpoint: RestClientService.PATHS.AUTH_LOGOUT,
          // method: 'delete',
          redirect: {
            success: '/pages',
            failure: null,
          },
        },
      }),
    ],
    forms: {
      login: {
        redirectDelay: 0,
        strategy: 'email',
        rememberMe: false,
        showMessages: {
          success: false,
          error: true,
        },
      },
      logout: {
        redirectDelay: 0,
        strategy: 'email',
        showMessages: {
          success: false,
          error: true,
        },
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
  RestClientService,
  UserService,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
