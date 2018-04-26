import {Component, Input, OnInit} from '@angular/core';

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

  @Input() CURRENT_FEED_TYPE: string;

  @Input() followCount: number;

  @Input() commentCount: number;

  constructor() { }

  ngOnInit() {
  }

}
