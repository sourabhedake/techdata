import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-quiz-board',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})
export class QuizBoardComponent implements OnDestroy {

  currentTheme: string;
  themeSubscription: any;
  quizTimerText: string;

  @Input() quiz: any;
  @Input() quizType: string;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });

    if (this.quizType === 'active') {
      this.quizTimerText = 'Quiz ends in ';
    }
    else if (this.quizType === 'upcoming') {
      this.quizTimerText = 'Quiz starts in ';
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
