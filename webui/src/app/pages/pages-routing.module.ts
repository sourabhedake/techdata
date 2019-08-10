import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizViewComponent } from './quiz/quiz-view/quiz.component';
import { QuizPageComponent } from './quiz/quiz-page/quiz.component';
import { QuizResultComponent } from './quiz/quiz-result/quiz.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'quizzes',
      component: QuizComponent,
    },
    {
      path: 'quizzes/:id',
      component: QuizViewComponent,
    },
    {
      path: 'quizzes/:id/contest-page',
      component: QuizPageComponent,
    },
    {
      path: 'quizzes/:id/attempts/:attemptId/result',
      component: QuizResultComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
