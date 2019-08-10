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
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz.component';
import { QuizBoardComponent } from './quiz-board/quiz.component';
import { RestClientService } from '../../@core/utils';
import { QuizViewComponent } from './quiz-view/quiz.component';
import { QuizPageComponent } from './quiz-page/quiz.component';
import { QuizResultComponent } from './quiz-result/quiz.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbRadioModule,
    NbCheckboxModule,
    NbUserModule,
    NbListModule,
    RouterModule,
    NbIconModule,
    CountdownModule,
  ],
  declarations: [
    QuizComponent,
    QuizViewComponent,
    QuizPageComponent,
    QuizResultComponent,
    QuizCardComponent,
    QuizBoardComponent,
  ],
  exports: [
    QuizCardComponent,
    QuizBoardComponent,
  ],
  providers: [
    RestClientService
  ]
})
export class QuizModule { }
