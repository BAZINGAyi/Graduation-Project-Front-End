import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-comments',
  templateUrl: './comment-comments.component.html',
  styleUrls: ['./comment-comments.component.css']
})
export class CommentCommentsComponent implements OnInit {

  datas = [1];
  constructor() { }

  ngOnInit() {
    this.datas.push(2);
    this.datas.push(3);
    this.datas.push(4);
  }

}
