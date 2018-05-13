import {Component, HostListener, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material';
import {IndexData} from '../../shared/model/index-data.model';
import {AppSettings} from '../../shared/url/AppSettings';
import {IndexServiceComponent} from '../index/shared/IndexServiceComponent';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ProgressBarServiceComponent} from '../../shared/progressbar/progressBarService.component';
import {LoginComponent} from '../../authentication/login/login.component';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../shared/model/user.model';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  // feeds 流数据
  indexDatas: IndexData[];
  commentCount = '';
  followerUserCount = '';
  followeeUserCount = '';
  followeeQuestionCount = '';

  // 接收地址栏的用户Id
  userId: number;

  public  MY_QUESTION = 'NORMAL_FEED';

  offset = 0;

  headUrl = '';

  name = '';

  // 判断是否滚动到底部
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.offset = this.offset + 10;
      this.indexServiceComponent
        .getLoginUserQuestionList(this.offset + '', this.userId)
        .subscribe( data => {
          if (data.code === AppSettings.getSuccessHttpResponseCode()) {
            this.indexDatas = this.indexDatas.concat(data.questionList);
          }
        });
    }
  }

  constructor(private indexServiceComponent: IndexServiceComponent,
              public authenticationService: AuthenticationService,
              private progressBarService: ProgressBarServiceComponent,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.checkCurrentUserIsUserSelf();
    // 获取主页 question 数据
    this.getQuestion();
  }

  private getQuestion() {
    this.progressBarService.openProgressBar();
    this.indexServiceComponent
      .getLoginUserQuestionList(this.offset + '', this.userId)
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.initPageData(data);
        } else {
          alert('登录已过期, 请你重新登录');
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        this.progressBarService.closeProgressBar();
      });
  }

  initUserData(user: User) {
    const userId = user.id;
    this.headUrl = user.headUrl;
    this.name = user.name;
  }

  checkCurrentUserIsUserSelf() {
    const currentUser = this.authenticationService.getCurrentUserInfo();

    if (currentUser !== null && currentUser !== undefined) {
      const userId: number = currentUser.id;
      // 如果打开的用户本身的档案写则可以操作按钮
      if (this.userId === userId) {
        this.MY_QUESTION = 'MY_QUESTION_FEED';
      }
    } else {
      this.MY_QUESTION = 'NORMAL_FEED';
    }
  }

  initPageData(data: any) {
    this.indexDatas = data.questionList;
    this.commentCount = data.commentCount;
    this.followerUserCount = data.followerUserCount;
    this.followeeUserCount = data.followeeUserCount;
    this.followeeQuestionCount = data.followeeQuestionCount;
    this.initUserData(data.user);
  }
}
