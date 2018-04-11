import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../../shared/url/AppSettings';
import {IndexData} from '../../../shared/model/index-data.model';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {AskQuestionComponent} from '../../../shared/component/ask-question/ask-question.component';

@Component({
  selector: 'app-hot-question',
  templateUrl: './hot-question.component.html',
  styleUrls: ['./hot-question.component.css']
})
export class HotQuestionComponent implements OnInit {

  // feeds 流数据
  indexDatas: IndexData[];

  constructor(private  httpClient: HttpClient) { }

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion() {
    const questionUrl = AppSettings.getQuestionsUrl('0');
    this.httpClient.get<IndexData[]>(questionUrl).subscribe( data => { this.indexDatas = data; });
  }

}
