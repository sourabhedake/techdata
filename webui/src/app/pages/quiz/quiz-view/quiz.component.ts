import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  RestClientService
} from '../../../@core/utils';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-quiz',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})

export class QuizViewComponent implements OnDestroy, OnInit {

  parameter = {
    quiz_id: ""
  }

  constructor(private rc: RestClientService,
              private router: Router,
              private actRouter: ActivatedRoute) {
  }

  navigateQuizPage() {
    this.router.navigateByUrl('pages/quiz/' + this.parameter.quiz_id + '/contest-page');
  }

  ngOnInit() {
    this.parameter.quiz_id = this.actRouter.snapshot.paramMap.get('id');
  }

  ngOnDestroy() {}
}
