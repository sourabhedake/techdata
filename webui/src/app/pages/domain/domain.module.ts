import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbUserModule,
  NbListModule,
  NbIconModule,
  NbTabsetModule,
  NbButtonModule,
  NbRadioModule,
  NbCheckboxModule,
  NbToastrModule,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';

import { ThemeModule } from '../../@theme/theme.module';
import { DomainComponent } from './domain.component';
import { RestClientService } from '../../@core/utils';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbTabsetModule,
    NbButtonModule,
    NbListModule,
    RouterModule,
  ],
  declarations: [
    DomainComponent
  ],
  providers: [
    RestClientService
  ]
})
export class DomainModule { }
