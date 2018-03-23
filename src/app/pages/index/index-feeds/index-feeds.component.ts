import {Component, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-pages-index-feeds',
  templateUrl: './index-feeds.component.html',
  styleUrls: ['./index-feeds.component.css'],
})

export class IndexFeedsComponent implements OnInit {

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


