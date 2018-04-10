import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../../shared/url/AppSettings';
import {IndexData} from '../../../shared/model/index-data.model';

@Injectable()
export class TopicService {

  constructor(private httpClient: HttpClient) { }

  /**
   *  获取主页的问题数据
   */
  getTopicQuestion(offset: string): Observable<IndexData[]> {
    const questionUrl = AppSettings.getQuestionsUrl(offset);
    return this.httpClient.get<IndexData[]>(questionUrl);
  }

}
