import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../shared/url/AppSettings';
import {QuestionIndex} from '../../shared/model/question/question-index.model';

@Injectable()
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  /**
   * 获取问题的详细信息
   */
  getQuestionDetailById(qid: number): Observable<QuestionIndex> {
    const questionDetailUrl = AppSettings.getQuestionDetail(qid);
    return this.httpClient.get<QuestionIndex>(questionDetailUrl);
  }
}
