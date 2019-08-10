import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  RestClientService
} from '../../../@core/utils';
import {
  ActivatedRoute,
  ParamMap,
  Router
} from '@angular/router';
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbToastrService
} from '@nebular/theme';

@Component({
  selector: 'ngx-quiz-page',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})

export class QuizResultComponent implements OnDestroy, OnInit {

  parameter = {
    quiz_id: '',
    attempt_id: '',
  }

  result: {
    score: '',
    questionCount: ''
  }

  constructor(private rc: RestClientService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private toastrService: NbToastrService) {}

  ngOnInit() {
    this.actRouter.paramMap.subscribe((params: ParamMap) => {
      this.parameter.quiz_id = params.get('id');
      this.parameter.attempt_id = params.get('attemptId');

      this.rc.call(this.rc.p().QUIZ_GET_RESULT, [this.parameter.quiz_id, this.parameter.attempt_id])
        .subscribe(response => {
            if (response.data.result) {
              this.result = response.data.result;
              return;
            }
            this.showToast('Quiz Results', response.data.errMsg, 'danger');
            this.router.navigateByUrl('pages/quizzes/' + this.parameter.quiz_id);
            return false;
          },
          (err) => {
            this.showToast('Quiz', 'Cannot get the quiz result', 'danger');
            this.router.navigateByUrl('pages/quizzes/' + this.parameter.quiz_id);
            return false;
          })

    });
  }

  navigateToHome() {
    this.router.navigateByUrl('pages/dashboard');
    return false;
  }

  ngOnDestroy() {}

  showToast(title: string, msg: string, status, duration = 3000) {
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_LEFT;
    this.toastrService.show(title, msg, {
      position,
      status,
      duration,
      limit: 5
    });
  }

}
