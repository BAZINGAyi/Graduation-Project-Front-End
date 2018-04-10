import { Component, OnInit } from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {AppSettings} from '../../../shared/url/AppSettings';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-topic-feeds',
  templateUrl: './topic-feeds.component.html',
  styleUrls: ['./topic-feeds.component.css']
})
export class TopicFeedsComponent implements OnInit {

  // feeds 流数据
  indexDatas: IndexData[];

  feeds = [1];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.feeds.push(2);
    this.feeds.push(3);
    this.feeds.push(4);
    this.feeds.push(5);
    // 获取主页 question 数据
    this.getQuestion();
  }

  private getQuestion() {
    const questionUrl = AppSettings.getQuestionsUrl('0');
    this.httpClient.get<IndexData[]>(questionUrl).subscribe( data => { this.indexDatas = data; });
  }
}
