import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  RestClientService
} from '../../@core/utils';

@Component({
  selector: 'ngx-quiz',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnDestroy {

  quizTypes = {
    ACTIVE: 'active',
    UPCOMING: 'upcoming',
    ARCHIVE: 'archive',
  }

  public quizList = {
    archive: {
      quiz: [],
      quizBucket: [],
      loading: false,
      count: 0
    },
    upcoming: {
      quiz: [],
      quizBucket: [],
      loading: false,
      count: 0
    },
    active: {
      quiz: [],
      quizBucket: [],
      loading: false,
      count: 0
    },
    pageToLoadNext: 1,
  };

  private pushIntoQuiz(q: any, newQuiz: any) {
    q.quiz.push(newQuiz);
    q.count++;

    this.pushIntoQuizArchiveBucket(q, newQuiz, 6);
  }

  private pushIntoQuizArchiveBucket(q: any, newQuiz: any, bucketSize: Number) {
    if (!q.quizBucket[0]) {
      q.quizBucket[0] = [newQuiz];

    } else if (q.quizBucket[q.quizBucket.length - 1].length >= bucketSize) {
      q.quizBucket.push([newQuiz]);

    } else {
      q.quizBucket[q.quizBucket.length - 1].push(newQuiz)
    }
  }

  constructor(private rc: RestClientService) {
    this.loadNextActive();
    this.loadNextArchive();
    this.loadNextUpcoming();
  }

  public loadNextArchive() {
    if (this.quizList.archive.loading) {
      return;
    }
    this.quizList.archive.loading = true;
    this.rc.call(this.rc.p().QUIZ_GET, ['ARCHIVE'])
    .pipe()
      .subscribe(data => {
        console.log("donee" + data);
        this.pushIntoQuiz(this.quizList.archive, {
          'title': 'title',
          'text': 'archive' + this.quizList.archive.count
        });
      }, (err) => {
          console.log("Error: ", err.error);
      });
    this.quizList.archive.loading = false;
  }

  loadNextUpcoming() {
    // if (this.quizList.upcoming.loading) {
    //   return;
    // }
    // this.quizList.upcoming.loading = true;
    // this.pushIntoQuiz(this.quizList.upcoming, {
    //   'title': 'title',
    //   'text': this.quizList.upcoming.count
    // });
    // this.quizList.upcoming.loading = false;
  }

  loadNextActive() {
    // if (this.quizList.active.loading) {
    //   return;
    // }
    // this.quizList.active.loading = true;
    // this.pushIntoQuiz(this.quizList.active, {
    //   'title': 'title',
    //   'text': this.quizList.active.count
    // });
    // this.quizList.active.loading = false;
  }

  ngOnDestroy() {}
}
