import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

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
  }
}
