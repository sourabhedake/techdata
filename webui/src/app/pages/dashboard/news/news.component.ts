import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  RestClientService
} from '../../../@core/utils';
import {
  NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition
} from '@nebular/theme';

@Component({
  selector: 'ngx-news',
  styleUrls: ['./news.component.scss'],
  templateUrl: './news.component.html',
})
export class NewsComponent {

  news = {
    newsList: [],
    loading: false,
  }

  constructor(private rc: RestClientService,
    private toastrService: NbToastrService) {
    this.loadNextFeed();
  }

  loadNextFeed() {
    if (this.news.loading) {
      return;
    }

    this.news.loading = true;
    this.rc.call(this.rc.PATHS.DASHBOARD_GET_NEWS)
      .pipe()
      .subscribe(response => {
        response.data.forEach(news => {
          this.news.newsList.push(news);
        });
      }, (err) => {
        this.news.newsList.push({
          headline: 'Is Vivo S1 a Better Buy Than the Redmi K20 and Realme X?',
          description: 'News Description',
          link: 'https://facebook.com'
        });
        this.showToast("News Feed", 'Unable to get newsfeed.', 'danger');
      });
  }

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
