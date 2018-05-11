import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';

export const NORMAL_FEED = 'NORMAL_FEED';
export const MY_QUESTION = 'MY_QUESTION_FEED';

@Component({
  selector: 'app-feed-action',
  templateUrl: './feed-action.component.html',
  styleUrls: ['./feed-action.component.css']
})

export class FeedActionComponent implements OnInit {

  public  NORMAL_FEED = 'NORMAL_FEED';

  public  MY_QUESTION = 'MY_QUESTION_FEED';

  public MY_FOLLOW_QUESTION = 'MY_FOLLOW_QUESTION';

  @Input() CURRENT_FEED_TYPE: string;

  @Input() followCount: number;

  @Input() commentCount: number;

  @Input() questionId: number;

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  followQuestion() {
    const url = AppSettings.getFollowQuestionUrl();
    this.http.post<any>(url, { questionId: this.questionId})
      .subscribe( data => {console.log(data); });
  }

}
