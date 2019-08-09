import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  RestClientService
} from '../../../@core/utils';

@Component({
  selector: 'ngx-quiz-page',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})

export class QuizPageComponent implements OnDestroy, OnInit {

  constructor(private rc: RestClientService) {
    console.log("constr");
  }

  ngOnInit() {
    console.log("onIntit");
  }

  ngOnDestroy() {}
}
