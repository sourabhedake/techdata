import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbUserModule,
  NbListModule,
  NbIconModule,
  NbTabsetModule,
  NbButtonModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz.component';
import { QuizBoardComponent } from './quiz-board/quiz.component';
import { RestClientService } from '../../@core/utils';
import { QuizViewComponent } from './quiz-view/quiz.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbUserModule,
    NbListModule,
    NbIconModule,
  ],
  declarations: [
    QuizComponent,
    QuizViewComponent,
    QuizCardComponent,
    QuizBoardComponent,
  ],
  exports: [
    QuizViewComponent,
    QuizCardComponent,
    QuizBoardComponent,
  ],
  providers: [
    RestClientService
  ]
})
export class QuizModule { }
