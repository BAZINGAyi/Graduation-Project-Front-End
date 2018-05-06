import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AskQuestionComponent} from '../../../shared/component/ask-question/ask-question.component';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {AppSettings} from '../../../shared/url/AppSettings';

@Component({
  selector: 'app-index-profile',
  templateUrl: './index-profile.component.html',
  styleUrls: ['./index-profile.component.css']
})
export class IndexProfileComponent implements OnInit {

  IS_DISPLAY = false;

  name = '';
  headUrl = '';
  loginTime = '';

  constructor(public dialog: MatDialog,
              public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.initUserData();
  }

  openAskQuestionDialog() {
    const dialogRef = this.dialog.open(AskQuestionComponent, AppSettings.getDialogQuestionConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  initUserData() {
    const currentUser = this.authenticationService.getCurrentUserInfo();
    if (currentUser === undefined || currentUser === null) {
      this.IS_DISPLAY = false;
      return;
    } else {
      this.IS_DISPLAY = true;
    }
    const userId = currentUser.id;
    this.headUrl = currentUser.headUrl;
    this.name = currentUser.name;
  }
}
