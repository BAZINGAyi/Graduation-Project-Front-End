import {Component, Input, OnInit} from '@angular/core';
import {QuestionComment} from '../../../shared/model/question/question-comment.model';
import {Comment} from '../../../shared/model/question/comment.model';
import {CommentSon} from '../../../shared/model/question/commentSon.model';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-comment-comments',
  templateUrl: './comment-comments.component.html',
  styleUrls: ['./comment-comments.component.css']
})
export class CommentCommentsComponent implements OnInit {

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() commentListInComment: CommentSon[];

  IS_LOGIN = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.IS_LOGIN = this.authenticationService.isLogin();
  }

}
