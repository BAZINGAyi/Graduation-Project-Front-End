import {Component, Inject, Input, OnInit} from '@angular/core';
import {QuestionComment} from '../../../shared/model/question/question-comment.model';
import {Comment} from '../../../shared/model/question/comment.model';
import {CommentSon} from '../../../shared/model/question/commentSon.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../../../authentication/login/login.component';
import {AppSettings} from '../../../shared/url/AppSettings';
import {SmallDialogComponent} from '../../../shared/component/small-dialog/small-dialog.component';
import {QuestionService} from '../question.service';
import {WendaUtils} from '../../../shared/util/wendaUtil.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment-comments',
  templateUrl: './comment-comments.component.html',
  styleUrls: ['./comment-comments.component.css']
})
export class CommentCommentsComponent implements OnInit {

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() commentListInComment: CommentSon[];

  constructor(private authenticationService: AuthenticationService,
              public dialog: MatDialog,
              public questionService: QuestionService,
              public wendaUtils: WendaUtils,
              private router: Router) { }

  ngOnInit() {
  }

  deleteCommentOfAnswer(comment: CommentSon) {
    const commentId = comment.comment.id;

    if (commentId === null || commentId === undefined) {
      return;
    }

    this.questionService.deleteAnswer(commentId)
      .subscribe( data => {
        if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogQuestionConfig());
        } else if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.wendaUtils.reloadPage();
        }
        alert(data.msg);
      });
  }

  updateCommentOfAnswer(comment: CommentSon) {
    const dialogRef = this.dialog.open(SmallDialogComponent);
    dialogRef.componentInstance.comment = comment.comment;
  }

  openProfile(comment: CommentSon) {
    const userId = comment.comment.userId;
    this.router.navigate(['pages/profile', { id: userId} ]);
  }
}

