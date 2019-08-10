import { Component } from '@angular/core';

import { DASHBOARD_MENU, QUIZ_MENU, ACCOUNT_MENU } from './pages-menu';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { RestClientService } from '../@core/utils';
import { map } from 'leaflet';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = [];

  domainMenuItems: NbMenuItem[] = [{
      title: 'Domains',
      link: '/pages/domains',
      children: []
  }];

  constructor(private nbMenuService: NbMenuService,
    private rc: RestClientService) {
    rc.call(rc.PATHS.DOMAIN_GET_MENU).pipe().subscribe(response => {
      console.log(response);
      response.data.forEach(domain => {
        this.domainMenuItems[0].children.push(domain);
      });
      this.nbMenuService.addItems(DASHBOARD_MENU.concat(this.domainMenuItems).concat(QUIZ_MENU).concat(ACCOUNT_MENU));
    }, (err) => {
        this.domainMenuItems = [];
    });
  }
}
