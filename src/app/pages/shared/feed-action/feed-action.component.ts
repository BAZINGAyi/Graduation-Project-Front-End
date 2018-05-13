import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';
import {Question} from '../../../shared/model/question/question.model';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../../authentication/login/login.component';
import {QuestionService} from '../../question/question.service';
import {AskQuestionComponent} from '../../../shared/component/ask-question/ask-question.component';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {WendaUtils} from '../../../shared/util/wendaUtil.service';

export const NORMAL_FEED = 'NORMAL_FEED';
export const MY_QUESTION = 'MY_QUESTION_FEED';

@Component({
  selector: 'app-feed-action',
  templateUrl: './feed-action.component.html',
  styleUrls: ['./feed-action.component.css']
})

export class FeedActionComponent implements OnInit {

  public  NORMAL_FEED = 'NORMAL_FEED';

  public  MY_QUESTION = 'MY_QUESTION_FEED';

  public MY_FOLLOW_QUESTION = 'MY_FOLLOW_QUESTION';

  @Input() CURRENT_FEED_TYPE: string;

  @Input() followCount: number;

  @Input() commentCount: number;

  @Input() question: Question;

  constructor(public http: HttpClient,
              public dialog: MatDialog,
              public questionService: QuestionService,
              public authenticationService: AuthenticationService,
              public wendaUtils: WendaUtils) { }

  ngOnInit() {
  }

  followQuestion() {
    const url = AppSettings.getFollowQuestionUrl();
    this.http.post<any>(url, { questionId: this.question.id})
      .subscribe( data => {console.log(data); });
  }

  updateQuestion() {
    const dialogRef = this.dialog.open(AskQuestionComponent, AppSettings.getDialogQuestionConfig());
    dialogRef.componentInstance.CURRENT_PAGE_TYPE = 'EDIT_ASK_QUESTION';
    dialogRef.componentInstance.question = this.question;
  }

  deleteQuestion() {
    const url = AppSettings.getDeleteQuestion();
    this.http.post<any>(url, { qid: this.question.id}, this.authenticationService.getHttpHeader())
      .subscribe( data => {
        if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogQuestionConfig());
        } else if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.wendaUtils.reloadPage();
        }
        alert(data.msg);
      });
  }

  cancelFollowQuestion() {
    const  qid: number = +this.question.id;
    this.questionService.unFollowQuestion(qid)
      .subscribe( data => {
        if (data.code !== undefined && data.code === 200) {
        } else {
          alert(data.msg);
        }
      });
  }
}
