import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../shared/url/AppSettings';
import {QuestionIndex} from '../../shared/model/question/question-index.model';
import {AuthenticationService} from '../../authentication/authentication.service';

@Injectable()
export class QuestionService {

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) { }

  /**
   * 获取问题的详细信息
   */
  getQuestionDetailById(qid: number): Observable<QuestionIndex> {
    const questionDetailUrl = AppSettings.getQuestionDetail(qid);
    return this.httpClient.get<QuestionIndex>(questionDetailUrl, this.authenticationService.getHttpHeader());
  }

  followQuestion(qid: number) {
    const url = AppSettings.getFollowQuestionUrl();
    return this.httpClient.post<any>(url, { questionId: qid}, this.authenticationService.getHttpHeader());
  }

  unFollowQuestion(qid: number) {
    const url = AppSettings.getUnFollowQuestionUrl();
    return this.httpClient.post<any>(url, { questionId: qid}, this.authenticationService.getHttpHeader());
  }

  likeComment(userId: number, commentId: number) {
    const url = AppSettings.getLikeCommentUrl();
    return this.httpClient.post<any>(url, { userId: userId, commentId: commentId}, this.authenticationService.getHttpHeader());
  }

  dislikeComment(userId: number, commentId: number) {
    const url = AppSettings.getDisLikeCommentUrl();
    return this.httpClient.post<any>(url, { userId: userId, commentId: commentId}, this.authenticationService.getHttpHeader());
  }
}
