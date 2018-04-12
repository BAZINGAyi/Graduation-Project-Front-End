import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Topic} from '../../../shared/model/topic.model';
import {AppSettings} from '../../../shared/url/AppSettings';
import {IndexData} from '../../../shared/model/index-data.model';
import {IndexTopic} from '../../../shared/model/topicIndex.model';

@Injectable()
export class TopicService {

  constructor(private httpClient: HttpClient) { }

  getTopicList(): Observable<IndexTopic[]> {
    const topicUrl = AppSettings.getTopicListUrl('0');
    return this.httpClient
      .get<IndexTopic[]>(topicUrl);
  }
}
