import { Component, OnInit } from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {IndexServiceComponent} from '../../index/shared/IndexServiceComponent';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';

@Component({
  selector: 'app-push-question',
  templateUrl: './push-question.component.html',
  styleUrls: ['./push-question.component.css']
})
export class PushQuestionComponent implements OnInit {

  public  MY_QUESTION = 'MY_QUESTION_FEED';

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
