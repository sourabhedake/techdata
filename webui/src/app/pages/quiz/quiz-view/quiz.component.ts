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
import { Observable } from 'rxjs';
import { map } from 'leaflet';

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
    this.router.navigateByUrl('pages/quizzes/' + this.parameter.quiz_id + '/contest-page');
    return false;
  }

  ngOnInit() {
    this.actRouter.paramMap.subscribe((params: ParamMap) => {
      this.parameter.quiz_id = params.get('id');
    });
  }

  ngOnDestroy() {}
}
