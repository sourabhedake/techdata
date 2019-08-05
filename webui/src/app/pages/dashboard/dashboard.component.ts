import {
  Component,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  quizTypes = {
    ACTIVE: 'active',
    UPCOMING: 'upcoming',
    ARCHIVE: 'archive',
  }

  quizList = {
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

  pushIntoQuiz(q: any, newQuiz: any) {
    if (q.quiz.length === 0) {
      q.quiz = [newQuiz];
    } else {
      q.quiz.push(newQuiz);
    }
    q.count++;

    this.pushIntoQuizBucket(q, newQuiz, 4);
  }

  pushIntoQuizBucket(q: any, newQuiz: any, bucketSize: Number) {
    console.log(q.quizBucket)
    console.log(q.quizBucket.length)
    if (q.quizBucket.length === 0) {
      q.quizBucket = [
        [
          newQuiz
        ]
      ];
    } else if (q.quizBucket[q.quizBucket.length - 1].length >= bucketSize) {
      q.quizBucket.push([newQuiz]);
    } else {
      q.quizBucket[q.quizBucket.length - 1].push(newQuiz)
    }
  }

  constructor() {}

  loadNextArchive() {
    if (this.quizList.archive.loading) {
      return;
    }
    this.quizList.archive.loading = true;
    this.pushIntoQuiz(this.quizList.archive, {
      'title': 'title',
      'text': this.quizList.archive.count
    });
    this.quizList.archive.loading = false;
  }

  loadNextUpcoming() {
    if (this.quizList.upcoming.loading) {
      return;
    }
    this.quizList.upcoming.loading = true;
    this.pushIntoQuiz(this.quizList.upcoming, {
      'title': 'title',
      'text': this.quizList.upcoming.count
    });
    this.quizList.upcoming.loading = false;
  }

  loadNextActive() {
    if (this.quizList.active.loading) {
      return;
    }
    this.quizList.active.loading = true;
    this.pushIntoQuiz(this.quizList.active, {
      'title': 'title',
      'text': this.quizList.active.count
    });
    this.quizList.active.loading = false;
  }

  ngOnDestroy() {}
}
