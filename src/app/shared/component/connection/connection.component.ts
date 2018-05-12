import { Component, OnInit } from '@angular/core';
import {JqueryServiceComponent} from '../../jquery/jQueryService.component';
import {AskQuestionComponent} from '../ask-question/ask-question.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {PersonComponent} from '../../../pages/person/person.component';
import {SendMessageComponent} from '../send-message/send-message.component';
import {AppSettings} from '../../url/AppSettings';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {LoginComponent} from '../../../authentication/login/login.component';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  IS_LOGIN = false;

  constructor(private jqueryServiceComponent: JqueryServiceComponent,
              public dialog: MatDialog,
              private router: Router,
              public authenticationService: AuthenticationService,
              ) {
  }

  ngOnInit() {
    this.IS_LOGIN = this.authenticationService.isLogin();
    this.fixFloatInstructionDivPosition();
  }

  /**
   * 设置 instruction div 滑动位置
   */
  fixFloatInstructionDivPosition() {
    let $ = this.jqueryServiceComponent.getJqueryObject();

    $.fn.fixedDiv = function(actCls){
      var that = $(this),
        offsetTop = that.offset().top,
        scrollTop;
      // 用于记录正常滚动状态时，距离视窗左侧的高度
      var normalLeftWidth = '';
      function fix() {
        scrollTop = $(document).scrollTop();
        // 滑动的距离大于到视窗顶部的高度
        if (scrollTop > offsetTop ) {
          that.addClass(actCls);
          // 获取屏幕宽度
          let width = document.body.clientWidth;
          width = (width - (43.5 + 22) * 16) / 2 + 44.5 * 16;
          that.css('left', width);
        } else {
          that.removeClass(actCls);
          normalLeftWidth = that.offset().left;
        }
      }
      fix();
      $(window).scroll(fix);
    };

    $('#fix1').fixedDiv('fix-div');
  }

  openAskQuestionDialog() {

    if (!this.authenticationService.isLogin()) {
      const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
      return;
    }

    const dialogRef = this.dialog.open(AskQuestionComponent, AppSettings.getDialogQuestionConfig());
    dialogRef.componentInstance.CURRENT_PAGE_TYPE = 'NORMAL_ASK_QUESTION';

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMyFollowProblem() {
    this.router.navigate(['/pages/person', { id: PersonComponent.FOLLOW_QUESTION }]);
  }

  openMyFollowPerson() {
    this.router.navigate(['pages/person', { id: PersonComponent.FOLLOW_PEOPLE }]);
  }

  openFollowMyPerson() {
    this.router.navigate(['pages/person', { id: PersonComponent.FANS }]);
  }

  openSendMessageDialog() {

    if (!this.authenticationService.isLogin()) {
      const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
      return;
    }

    const dialogRef = this.dialog.open(SendMessageComponent, AppSettings.getDialogSendMessageConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openPushQuestion() {
  //   this.router.navigate(['pages/person', { id: PersonComponent.PUSH_QUESTION }]);
  // }

  openMyStationLetter() {
    this.router.navigate(['pages/person', { id: PersonComponent.STATION_LETTER} ]);
  }

  openMyCommentQuestions() {
    this.router.navigate(['pages/person', { id: PersonComponent.MY_COMMENT_QUESTIONS} ]);
  }

  openMyProfile() {
    this.router.navigate(['pages/person', { id: PersonComponent.MY_PROFILE} ]);
  }
}
