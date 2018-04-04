import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  feeds = [1];

  ngOnInit(): void {
    this.feeds.push(2);
    this.feeds.push(3);
    this.feeds.push(4);
    this.feeds.push(5);
  }

  constructor() { }

}
