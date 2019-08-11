import {
  Component,
  OnDestroy,
  OnInit,
  SecurityContext,
  Input
} from '@angular/core';
import {
  RestClientService
} from '../../../../@core/utils';
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

@Component({
  selector: 'ngx-news-card',
  styleUrls: ['./news-card.component.scss'],
  templateUrl: './news-card.component.html',
})

export class NewsCardComponent {

  @Input()
  news = {
    headline: '',
    description: '',
    link: '',
  }
  
  constructor() {
  }

}
