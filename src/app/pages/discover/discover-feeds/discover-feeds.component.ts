import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-feeds',
  templateUrl: './discover-feeds.component.html',
  styleUrls: ['./discover-feeds.component.css']
})
export class DiscoverFeedsComponent implements OnInit {

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
