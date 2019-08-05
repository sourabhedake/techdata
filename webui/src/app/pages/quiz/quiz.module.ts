import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbUserModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-card/quiz.component';
import { QuizBoardComponent } from './quiz-board/quiz.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbListModule,
    NbIconModule,
  ],
  declarations: [
    QuizComponent,
    QuizCardComponent,
    QuizBoardComponent,
  ],
  exports: [
    QuizCardComponent,
    QuizBoardComponent,
  ],
})
export class QuizModule { }
