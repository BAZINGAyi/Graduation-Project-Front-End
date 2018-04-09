import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';
import {Observable} from 'rxjs/Observable';
import {IndexData} from '../../../shared/model/index-data.model';

@Injectable()
export class DiscoverService {

    constructor(private httpClient: HttpClient,
                ) {
    }

  /**
   *  获取主页的问题数据
   */
  getDiscoverQuestion(offset: string): Observable<IndexData[]> {
    const questionUrl = AppSettings.getQuestionsUrl(offset);
    console.log(questionUrl);
    return this.httpClient.get<IndexData[]>(questionUrl);
  }


}
