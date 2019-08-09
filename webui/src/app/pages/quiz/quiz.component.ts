import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  RestClientService
} from '../../@core/utils';
import { NbToastrService, NbGlobalPosition, NbGlobalLogicalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-quiz',
  styleUrls: ['./quiz.component.scss'],
  templateUrl: './quiz.component.html',
})

export class QuizComponent implements OnDestroy {

  bucketSize = 6;

  QUIZ_TYPES = {
    ACTIVE: 'ACTIVE',
    UPCOMING: 'UPCOMING',
    ARCHIVE: 'ARCHIVE',
  };

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

    this.pushIntoQuizArchiveBucket(q, newQuiz, this.bucketSize);
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

  constructor(private rc: RestClientService,
              private toastrService: NbToastrService) {
    this.loadNextActive();
    this.loadNextArchive();
    this.loadNextUpcoming();
  }

  public loadNextArchive() {
    this.loadNext(this.QUIZ_TYPES.ARCHIVE);
  }
  
  loadNextUpcoming() {
    this.loadNext(this.QUIZ_TYPES.UPCOMING);
  }

  loadNextActive() {
    this.loadNext(this.QUIZ_TYPES.ACTIVE);
  }

  loadNext(quizType: string) {
    var quiz;
    switch (quizType) {
      case this.QUIZ_TYPES.ARCHIVE:
        quiz = this.quizList.archive;
        break;
      case this.QUIZ_TYPES.ACTIVE:
        quiz = this.quizList.active;
        break;
      case this.QUIZ_TYPES.UPCOMING:
        quiz = this.quizList.upcoming;
        break;
      default:
        return;
    }
    if (quiz.loading) {
      return;
    }
    quiz.loading = true;
    this.rc.call(this.rc.p().QUIZ_GET, [quizType])
      .pipe()
      .subscribe(data => {
        if (!data.data) {
          this.showToast(quizType + " Quiz", data.errMsg, 'danger');
        }
        data.data.forEach(element => {
          console.log(element);
          this.pushIntoQuiz(quiz, element);  
        });
      }, (err) => {
        console.log("Error: ", err.error);
        this.showToast(quizType + " Quiz", err.errMsg, 'danger');
      });
    // quiz.loading = false;
  }

  showToast(title: string, msg: string, status, duration=1000) {
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_LEFT;
    this.toastrService.show(title, msg, {position, status, duration, limit: 5});
  }
  ngOnDestroy() {}
}
