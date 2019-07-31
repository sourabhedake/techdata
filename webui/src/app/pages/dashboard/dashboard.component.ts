import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  loadNext(cardData, $timeout, $scope) {
    if (cardData.loading) { return; }
    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    $timeout(function () { $scope.displayErrorMsg = false; }, 2000);

    cardData.placeholders = [];
    cardData.news.push([{ 'title': 'title', 'text': 'text' }]);
    cardData.loading = false;
    cardData.pageToLoadNext++;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
