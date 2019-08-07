import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-quiz-card',
  templateUrl: 'quiz.component.html',
})
export class QuizCardComponent {

  @Input() quiz: JSON;
}
