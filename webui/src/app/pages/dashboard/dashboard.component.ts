import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  QuizComponent
} from '../quiz/quiz.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  constructor(private quizComponent: QuizComponent) {
    quizComponent.bucketSize = 4;
    quizComponent.clearQuiz();
    this.loadNextActive();
    this.loadNextUpcoming();
    this.loadNextArchive();
  }

  loadNextArchive() {
    this.quizComponent.loadNextArchive();
  }

  loadNextUpcoming() {
    this.quizComponent.loadNextUpcoming();
  }

  loadNextActive() {
    this.quizComponent.loadNextActive();
  }

  ngOnDestroy() {}
}
