import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../shared/url/AppSettings';
import {QuestionIndex} from '../../shared/model/question/question-index.model';
import {IndexData} from '../../shared/model/index-data.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // 接收从导航栏传入的数据
  searchContent: string;

  // 搜索返回的数据
  searchDataList: IndexData[];

  notFoundDataState = false;

  notFoundData = '没有找到对应的问题' ;

  ngOnInit(): void {
    this.getSearchResult();
  }

  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient) {
    this.route.params.subscribe(params => {
      this.searchContent = params['searchContent'];
      this.getSearchResult();
    });
  }

  getSearchResult() {
    if (this.searchContent != null && this.searchContent !== '') {
      const searchUrl = AppSettings.getSearchQuestionList(this.searchContent, 10);
      this.httpClient
        .get<IndexData[]>(searchUrl)
        .subscribe( data => { this.dealReturnResult(data); });
    }
  }

  private dealReturnResult(data) {
    this.searchDataList = data;
    if (this.searchDataList.length === 0) {
      this.notFoundDataState = true;
    } else {
      this.notFoundDataState = false;
    }
  }
}
