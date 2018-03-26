import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-comments',
  templateUrl: './question-comments.component.html',
  styleUrls: ['./question-comments.component.css']
})
export class QuestionCommentsComponent implements OnInit {

  data = ['12312asd3'];

  constructor() { }

  ngOnInit() {
    this.data.push('12312388asd');
    this.data.push('12312asd3asd88asd');
    this.data.push('1231238998asd');

  }

}
