import { Component, OnInit } from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {IndexServiceComponent} from '../../index/shared/IndexServiceComponent';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';

@Component({
  selector: 'app-follow-question',
  templateUrl: './follow-question.component.html',
  styleUrls: ['./follow-question.component.css']
})
export class FollowQuestionComponent implements OnInit {

  offset = 0;

  // feeds 流数据
  indexDatas: IndexData[];

  ngOnInit(): void {
    // 获取主页 question 数据
    this.getQuestion();
  }

  constructor(private indexServiceComponent: IndexServiceComponent,
              private progressBarService: ProgressBarServiceComponent) { }

  private getQuestion() {
    this.progressBarService.openProgressBar();
    this.indexServiceComponent
      .getIndexQuestion(this.offset + '')
      .subscribe( data => {this.indexDatas = data; this.progressBarService.closeProgressBar(); });
  }


}
