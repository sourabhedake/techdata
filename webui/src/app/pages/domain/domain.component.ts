import {
  Component,
  OnDestroy,
  OnInit,
  SecurityContext
} from '@angular/core';
import {
  RestClientService
} from '../../@core/utils';
import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  NbToastrService,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from '@nebular/theme';
import {
  QuizComponent
} from '../quiz/quiz.component';
import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser';

@Component({
  selector: 'ngx-domain',
  styleUrls: ['./domain.component.scss'],
  templateUrl: './domain.component.html',
})

export class DomainComponent implements OnDestroy, OnInit {

  parameter = {
    domain_id: ""
  }

  domain = {
    name: '',
    domain: '',
    description: '',
    knowledge: '',
  }

  domain_description: SafeHtml;

  constructor(private rc: RestClientService,
    private toastrService: NbToastrService,
    private sanitizer: DomSanitizer,
    private actRouter: ActivatedRoute,
    private quizComponent: QuizComponent) {
    quizComponent.bucketSize = 4;
  }

  ngOnInit() {
    this.actRouter.paramMap.subscribe((params: ParamMap) => {
      this.parameter.domain_id = params.get('id');
      this.getDomainIntro();
      this.getDomainDescription();

      this.quizComponent.clearQuiz();
      this.quizComponent.domain_id = this.parameter.domain_id
      this.loadNextActive();
      this.loadNextUpcoming();
      this.loadNextArchive();
    });
  }


  loadNextArchive() {
    this.quizComponent.loadNextArchive();
  }

  loadNextUpcoming() {
    this.quizComponent.loadNextUpcoming();
  }

  loadNextActive() {
    this.quizComponent.loadNextActive();
  }

  getDomainIntro() {
    this.rc.call(this.rc.PATHS.DOMAIN_GET, [this.parameter.domain_id])
      .pipe()
      .subscribe(response => {
        this.domain = response.data;
      }, (err) => {
        this.showToast('Domain - ' + this.domain.name, 'Unable to fetch domain details', 'danger');
      })
  }

  getDomainDescription() {
    this.rc.call(this.rc.PATHS.DOMAIN_GET_DESCRIPTION, [this.parameter.domain_id])
      .pipe()
      .subscribe(response => {
        this.domain.knowledge = response.data;
      }, (err) => {
        this.domain.knowledge = this.sanitizer.sanitize(SecurityContext.HTML, "<p>Domain knowledge data <b>not available</b></p>");
        this.showToast('Domain - ' + this.domain.name, err.error.data.errMsg, 'warning');
      })
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
