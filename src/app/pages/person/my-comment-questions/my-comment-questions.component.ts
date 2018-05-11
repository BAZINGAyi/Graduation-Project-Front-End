import { Component, OnInit } from '@angular/core';
import {IndexServiceComponent} from '../../index/shared/IndexServiceComponent';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {IndexData} from '../../../shared/model/index-data.model';

@Component({
  selector: 'app-my-comment-questions',
  templateUrl: './my-comment-questions.component.html',
  styleUrls: ['./my-comment-questions.component.css']
})
export class MyCommentQuestionsComponent implements OnInit {

  public  NORMAL_FEED = 'NORMAL_FEED';

  // feeds 流数据
  indexDatas: IndexData[];

  constructor(private indexServiceComponent: IndexServiceComponent,
              private progressBarService: ProgressBarServiceComponent) { }

  ngOnInit() {
    this.getCommentQuestionList();
  }

  private getCommentQuestionList() {
    this.indexServiceComponent
      .getMyCommentQuestionList(0 + '')
      .subscribe( data => {this.indexDatas = data; });
  }
}
