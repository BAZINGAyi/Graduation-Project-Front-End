import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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

  // 接收选择的 topic Id
  @Input()topicId;

  public  NORMAL_FEED = 'NORMAL_FEED';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // 获取主页 question 数据
    this.getTopicQuestionListByTid(this.topicId);
  }

  getTopicQuestionListByTid(id: number) {
    const questionUrl = AppSettings.getTopicQuestionList(id, 0);
    this.httpClient.get<IndexData[]>(questionUrl).subscribe( data => { this.indexDatas = data; console.log(this.indexDatas); });
  }
}
