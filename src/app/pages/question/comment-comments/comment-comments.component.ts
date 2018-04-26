import {Component, Input, OnInit} from '@angular/core';
import {QuestionComment} from '../../../shared/model/question/question-comment.model';
import {Comment} from '../../../shared/model/question/comment.model';
import {CommentSon} from '../../../shared/model/question/commentSon.model';

@Component({
  selector: 'app-comment-comments',
  templateUrl: './comment-comments.component.html',
  styleUrls: ['./comment-comments.component.css']
})
export class CommentCommentsComponent implements OnInit {

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() commentListInComment: CommentSon[];

  datas = [1];
  constructor() { }

  ngOnInit() {
    this.datas.push(2);
    this.datas.push(3);
    this.datas.push(4);
  }

}
