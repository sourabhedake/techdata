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
import { NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-quiz',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})

export class QuizViewComponent implements OnDestroy, OnInit {

  parameter = {
    quiz_id: ""
  }

  quiz = {
    name: '',
    domain: '',
    description: ''
  }

  constructor(private rc: RestClientService,
              private toastrService: NbToastrService,
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
      this.rc.call(this.rc.p().QUIZ_GET, [this.parameter.quiz_id])
      .pipe()
      .subscribe(data => {
        if (data.errMsg) {
          this.showToast("Quiz", data.errMsg, 'danger');
          return;
        }
        this.quiz = data;
      }, (err) => {
        this.showToast("Quiz", err.errMsg, 'danger');
      });

    });
  }

  ngOnDestroy() {}

  showToast(title: string, msg: string, status, duration = 3000) {
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_LEFT;
    this.toastrService.show(title, msg, { position, status, duration, limit: 5 });
  }
}
