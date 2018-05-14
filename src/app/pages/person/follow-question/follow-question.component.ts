import { Component, OnInit } from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {IndexServiceComponent} from '../../index/shared/IndexServiceComponent';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {AppSettings} from '../../../shared/url/AppSettings';
import {LoginComponent} from '../../../authentication/login/login.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-follow-question',
  templateUrl: './follow-question.component.html',
  styleUrls: ['./follow-question.component.css']
})
export class FollowQuestionComponent implements OnInit {

  public MY_FOLLOW_QUESTION = 'MY_FOLLOW_QUESTION';

  offset = 0;

  // feeds 流数据
  indexDatas: IndexData[];

  ngOnInit(): void {
    // 获取主页 question 数据
    this.getQuestion();
  }

  constructor(private indexServiceComponent: IndexServiceComponent,
              private progressBarService: ProgressBarServiceComponent,
              public dialog: MatDialog) { }

  private getQuestion() {
    this.progressBarService.openProgressBar();
    this.indexServiceComponent
      .getMyFollowQuestionList(this.offset + '')
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.indexDatas = data.questionList;
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()){
          alert('登录已过期, 请你重新登录');
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        } else if (data.code === AppSettings.getNoContentHttpResponseCode()) {
          this.indexDatas = data.questionList;
        }
        this.progressBarService.closeProgressBar();
      });
  }


}
