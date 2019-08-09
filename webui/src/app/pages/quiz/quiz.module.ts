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
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz.component';
import { QuizBoardComponent } from './quiz-board/quiz.component';
import { RestClientService } from '../../@core/utils';
import { QuizViewComponent } from './quiz-view/quiz.component';
import { RouterModule } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz.component';

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
  ],
  declarations: [
    QuizComponent,
    QuizViewComponent,
    QuizPageComponent,
    QuizCardComponent,
    QuizBoardComponent,
  ],
  exports: [
    QuizViewComponent,
    QuizPageComponent,
    QuizCardComponent,
    QuizBoardComponent,
  ],
  providers: [
    RestClientService
  ]
})
export class QuizModule { }
