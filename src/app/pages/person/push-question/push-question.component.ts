import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-push-question',
  templateUrl: './push-question.component.html',
  styleUrls: ['./push-question.component.css']
})
export class PushQuestionComponent implements OnInit {

  feeds = [1];

  ngOnInit(): void {
    this.feeds.push(2);
    this.feeds.push(3);
    this.feeds.push(4);
    this.feeds.push(5);
  }

  constructor() { }


}
