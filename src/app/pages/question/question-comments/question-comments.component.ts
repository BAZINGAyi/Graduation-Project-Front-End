import {Component, Input, OnInit} from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {QuestionComment} from '../../../shared/model/question/question-comment.model';

@Component({
  selector: 'app-question-comments',
  templateUrl: './question-comments.component.html',
  styleUrls: ['./question-comments.component.css']
})
export class QuestionCommentsComponent implements OnInit {

  @Input() comments: QuestionComment[];

  constructor() { }

  ngOnInit() {
  }

}
