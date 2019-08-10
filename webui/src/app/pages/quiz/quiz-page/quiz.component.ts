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

export class QuizPageComponent implements OnDestroy, OnInit {

  parameter = {
    quiz_id: ''
  }

  cur_question = {
    questionId: '',
    questionText: '',
    choice: [],
    attemptId: ''
  }

  choices: Number = 0;
  constructor(private rc: RestClientService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private toastrService: NbToastrService) {}

  getNextQuestion() {

    this.rc.call(this.rc.p().QUESTION_GET_NEXT, [this.parameter.quiz_id], {
      userId: null,
      attemptId: this.cur_question.attemptId,
      previousQtnId: this.cur_question.questionId,
      userAnswer: this.choices
    }).subscribe(response => {
      console.log(response);
      if (response.data.question) {
        this.cur_question = response.data.question;
        this.choices = 0;
      } else if (response.data.result) {
        this.router.navigateByUrl('pages/quizzes/' + this.parameter.quiz_id + '/attempts/' + response.data.result.attemptId + '/result');
        return false;
      }
    },
      (err) => {
        this.showToast('Quiz', '', 'danger');
        this.router.navigateByUrl('pages/quizzes/' + this.parameter.quiz_id);
        return false;
      })

  }

  ngOnInit() {
    this.actRouter.paramMap.subscribe((params: ParamMap) => {
      this.parameter.quiz_id = params.get('id');
      this.rc.call(this.rc.p().QUIZ_START, [this.parameter.quiz_id])
        .subscribe(response => {
            console.log(response);
            this.cur_question = response.data;
          },
          (err) => {
            var errMsg = err ? err.error ? err.error.data ? err.error.data.errMsg :'' :'' :'';
            if (errMsg == '') {
              errMsg = "Cannot start the quiz";
            }
            this.showToast('Quiz', errMsg, 'danger');
            this.router.navigateByUrl('pages/quizzes/' + this.parameter.quiz_id);
            return false;
          })

    });
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
