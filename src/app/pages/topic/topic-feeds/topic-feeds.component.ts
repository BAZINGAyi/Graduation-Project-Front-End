import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-feeds',
  templateUrl: './topic-feeds.component.html',
  styleUrls: ['./topic-feeds.component.css']
})
export class TopicFeedsComponent implements OnInit {

  feeds = [1];

  ngOnInit(): void {
    this.feeds.push(2);
    this.feeds.push(3);
    this.feeds.push(4);
    this.feeds.push(5);
  }

  constructor() {
  }
}
