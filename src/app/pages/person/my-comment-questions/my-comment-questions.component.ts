import { Component, OnInit } from '@angular/core';
import {IndexServiceComponent} from '../../index/shared/IndexServiceComponent';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {IndexData} from '../../../shared/model/index-data.model';
import {AppSettings} from '../../../shared/url/AppSettings';
import {LoginComponent} from '../../../authentication/login/login.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-my-comment-questions',
  templateUrl: './my-comment-questions.component.html',
  styleUrls: ['./my-comment-questions.component.css']
})
export class MyCommentQuestionsComponent implements OnInit {

  public  NORMAL_FEED = 'NORMAL_FEED';

  // feeds 流数据
  indexDatas: IndexData[];

  constructor(private indexServiceComponent: IndexServiceComponent,
              private progressBarService: ProgressBarServiceComponent,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCommentQuestionList();
  }

  private getCommentQuestionList() {
    this.indexServiceComponent
      .getMyCommentQuestionList(0 + '')
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.indexDatas = data.questionList;
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()){
          alert('登录已过期, 请你重新登录');
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        } else if (data.code === AppSettings.getNoContentHttpResponseCode()) {
          this.indexDatas = data.questionList;
        }
      });
  }
}
