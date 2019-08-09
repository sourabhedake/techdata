import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-quiz-card',
  templateUrl: 'quiz.component.html',
})
export class QuizCardComponent {

  @Input() quiz: JSON;
  constructor(private router: Router) {
  }

  navigateQuizView(id: string) {
    console.log('pages/quiz/' + id);
    this.router.navigateByUrl('pages/quizzes/' + id);
    return false;
  }
}
