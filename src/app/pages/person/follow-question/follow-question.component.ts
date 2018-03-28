import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-question',
  templateUrl: './follow-question.component.html',
  styleUrls: ['./follow-question.component.css']
})
export class FollowQuestionComponent implements OnInit {

  feeds = [1];

  ngOnInit(): void {
    this.feeds.push(2);
    this.feeds.push(3);
    this.feeds.push(4);
    this.feeds.push(5);
  }

  constructor() { }


}
