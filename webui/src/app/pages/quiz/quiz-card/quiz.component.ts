import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-quiz-card',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: 'quiz.component.html',
})
export class QuizCardComponent {

  @Input() quiz: JSON;
  constructor(private router: Router) {
  }

  navigateQuizView(id: string) {
    this.router.navigateByUrl('pages/quizzes/' + id);
    return false;
  }
}
