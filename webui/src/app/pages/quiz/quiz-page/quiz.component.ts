import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  RestClientService
} from '../../../@core/utils';

@Component({
  selector: 'ngx-quiz',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})

export class QuizPageComponent implements OnDestroy {

  constructor(private rc: RestClientService) {
  }

  ngOnDestroy() {}
}
