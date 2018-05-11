import {Component, Input, OnInit} from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {Feeds} from '../../../shared/model/disvocer/feeds.model';
import {FeedType} from './shared/feed-type';
import {FeedsData} from '../../../shared/model/disvocer/feedsData.model';
import * as moment from 'moment';

@Component({
  selector: 'app-time-line-feed',
  templateUrl: './time-line-feed.component.html',
  styleUrls: ['./time-line-feed.component.css']
})
export class TimeLineFeedComponent implements OnInit {

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() feed: Feeds;

  // 当前 feed的类型
  CURRENT_FEED_TYPE: number;

  FOLLOW_USER = FeedType.FOLLOW_USER;

  LIKE_COMMENT = FeedType.LIKE_COMMENT;

  USER_COMMENT_QUESTION_SEND_MESSAGE_TO_ATTENTION_USER = FeedType.USER_COMMENT_QUESTION_SEND_MESSAGE_TO_ATTENTION_USER;

  USER_COMMENT_QUESTION_SEND_MESSAGE_TO_FANS = FeedType.USER_COMMENT_QUESTION_SEND_MESSAGE_TO_FANS;

  constructor() { }

  ngOnInit() {
    this.initFeed();
  }

  private initFeed() {
    const type: number = this.feed.type;
    this.setCurrentFeedType(type);
  }

  setCurrentFeedType(type: number) {
    this.CURRENT_FEED_TYPE = type;
  }

  private transfromTime(second: string): string {
    return moment(second).fromNow();
  }
}
