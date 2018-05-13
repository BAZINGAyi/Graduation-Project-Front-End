import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WendaUtils} from '../../util/wendaUtil.service';
import {Comment} from '../../model/question/comment.model';
import {AppSettings} from '../../url/AppSettings';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-small-dialog',
  templateUrl: './small-dialog.component.html',
  styleUrls: ['./small-dialog.component.css']
})
export class SmallDialogComponent implements OnInit {

  comment: Comment;

  commentOfAnswer = '';

  constructor(private http: HttpClient,
              private wendaUtils: WendaUtils,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.commentOfAnswer = this.comment.content;
  }

  updateCommentOfAnswer() {

    if (!this.wendaUtils.checkUserInputLegal(this.commentOfAnswer) ||
    !this.wendaUtils.checkUserInputNumberLegal(this.comment.id)) {
      alert('请正确输入内容');
    }

    const url = AppSettings.getUpdateCommentOfAnswer();
    this.http.put<any>(
      url,
      {
        content: this.commentOfAnswer,
        commentId: this.comment.id
      },
      this.authenticationService.getHttpHeader()
    )
      .subscribe(data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          alert(data.msg);
          this.wendaUtils.reloadPage();
        } else {
          alert(data.msg);
        }
      });
  }
}
