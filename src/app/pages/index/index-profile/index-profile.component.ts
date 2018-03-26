import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AskQuestionComponent} from '../../../shared/component/ask-question/ask-question.component';

@Component({
  selector: 'app-index-profile',
  templateUrl: './index-profile.component.html',
  styleUrls: ['./index-profile.component.css']
})
export class IndexProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openAskQuestionDialog() {
    const dialogRef = this.dialog.open(AskQuestionComponent, {
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
