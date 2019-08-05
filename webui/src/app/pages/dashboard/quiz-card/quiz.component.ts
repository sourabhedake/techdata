import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-quiz',
  templateUrl: 'quiz.component.html',
})
export class QuizComponent {

  @Input() quiz: JSON;
}
