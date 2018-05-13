import {Component, HostListener, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material';
import {IndexData} from '../../shared/model/index-data.model';
import {AppSettings} from '../../shared/url/AppSettings';
import {IndexServiceComponent} from '../index/shared/IndexServiceComponent';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ProgressBarServiceComponent} from '../../shared/progressbar/progressBarService.component';
import {LoginComponent} from '../../authentication/login/login.component';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  // feeds 流数据
  indexDatas: IndexData[];

  public  MY_QUESTION = 'MY_QUESTION_FEED';

  offset = 0;

  headUrl = '';

  name = '';

  // 判断是否滚动到底部
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.offset = this.offset + 10;
      this.indexServiceComponent
        .getLoginUserQuestionList(this.offset + '')
        .subscribe( data => {
          if (data.code === AppSettings.getNoContentHttpResponseCode()) {
            return;
          }
          this.indexDatas = this.indexDatas.concat(data);
        });
    }
  }

  constructor(private indexServiceComponent: IndexServiceComponent,
              public authenticationService: AuthenticationService,
              private progressBarService: ProgressBarServiceComponent,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // 获取主页 question 数据
    this.getQuestion();
    this.initUserData();
  }

  private getQuestion() {
    this.progressBarService.openProgressBar();
    this.indexServiceComponent
      .getLoginUserQuestionList(this.offset + '')
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.indexDatas = data.questionList;
        } else {
          alert("登录已过期, 请你重新登录");
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        this.progressBarService.closeProgressBar();
      });
  }

  initUserData() {
    const currentUser = this.authenticationService.getCurrentUserInfo();
    const userId = currentUser.id;
    this.headUrl = currentUser.headUrl;
    this.name = currentUser.name;
  }

}
