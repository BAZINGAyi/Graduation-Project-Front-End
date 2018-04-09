import { Component, OnInit } from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {DiscoverService} from '../shared/DiscoverService.service';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';

@Component({
  selector: 'app-discover-feeds',
  templateUrl: './discover-feeds.component.html',
  styleUrls: ['./discover-feeds.component.css']
})
export class DiscoverFeedsComponent implements OnInit {

  // feeds 流数据
  indexDatas: IndexData[];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion() {
    const questionUrl = AppSettings.getQuestionsUrl('0');
    this.httpClient.get<IndexData[]>(questionUrl).subscribe( data => { this.indexDatas = data; });
  }

}
