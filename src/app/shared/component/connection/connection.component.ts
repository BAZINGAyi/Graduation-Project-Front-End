import { Component, OnInit } from '@angular/core';
import {JqueryServiceComponent} from '../../jquery/jQueryService.component';
import {AskQuestionComponent} from '../ask-question/ask-question.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {PersonComponent} from '../../../pages/person/person.component';
import {SendMessageComponent} from '../send-message/send-message.component';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  constructor(private jqueryServiceComponent: JqueryServiceComponent,
              public dialog: MatDialog,
              private router: Router
              ) { }

  ngOnInit() {
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
      function fix(){

        scrollTop = $(document).scrollTop();
        // 滑动的距离大于到视窗顶部的高度
        if (scrollTop > offsetTop ) {
          that.addClass(actCls);
          that.css('left',normalLeftWidth);
        } else {
          that.removeClass(actCls);
          normalLeftWidth = that.offset().left;
        }
      }
      fix();
      $(window).scroll(fix);
    }

    $('#fix1').fixedDiv('fix-div');
  }

  openAskQuestionDialog() {
    const dialogRef = this.dialog.open(AskQuestionComponent, {
      width:'60%',
      height: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMyFocusProblem() {
    this.router.navigate(['/pages/person', { id: PersonComponent.FOLLOW_QUESTION }]);
  }

  openMyFollowPerson() {
    this.router.navigate(['pages/person', { id: PersonComponent.FOLLOW_PEOPLE }]);
  }

  openFollowMyPerson() {
    this.router.navigate(['pages/person', { id: PersonComponent.FANS }]);
  }

  openSendMessageDialog() {
    const dialogRef = this.dialog.open(SendMessageComponent, {
      width: '50%',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPushQuestion() {
    this.router.navigate(['pages/person', { id: PersonComponent.PUSH_QUESTION }]);
  }

  openMyStationLetter() {
    this.router.navigate(['pages/person', { id: PersonComponent.STATION_LETTER} ]);
  }

  openMyCommentQuestions() {
    this.router.navigate(['pages/person', { id: PersonComponent.MY_COMMENT_QUESTIONS} ]);
  }

}
