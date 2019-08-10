import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  RestClientService
} from '../../@core/utils';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'leaflet';
import { NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-quiz',
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
    description: ''
  }

  view = 1;

  constructor(private rc: RestClientService,
              private toastrService: NbToastrService,
              private router: Router,
              private actRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.actRouter.paramMap.subscribe((params: ParamMap) => {
      this.parameter.domain_id = params.get('id');
      // this.rc.call(this.rc.p().DOMAIN_GET, [this.parameter.domain_id])
      // .pipe()
      // .subscribe(response => {
      //   if (response.errMsg) {
      //     this.showToast("Domain", response.errMsg, 'danger');
      //     return;
      //   }
      //   this.domain = response.data;
      // }, (err) => {
      //   this.showToast("Domain", err.errMsg, 'danger');
      // });

    });
  }

  ngOnDestroy() {}

  showView(id: number) {
    this.view = id;
  }
  
  showToast(title: string, msg: string, status, duration = 3000) {
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_LEFT;
    this.toastrService.show(title, msg, { position, status, duration, limit: 5 });
  }
}
