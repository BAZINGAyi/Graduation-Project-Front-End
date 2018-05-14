import { Component, OnInit } from '@angular/core';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {LoginComponent} from '../../../authentication/login/login.component';
import {User} from '../../../shared/model/user.model';

@Component({
  selector: 'app-fans',
  templateUrl: './fans.component.html',
  styleUrls: ['./fans.component.css']
})
export class FansComponent implements OnInit {

  userList: any;

  constructor(private progressBarService: ProgressBarServiceComponent,
              public dialog: MatDialog,
              public httpclient: HttpClient,
              public auth: AuthenticationService) { }

  ngOnInit() {
    this.getUserFollowerList();
  }

  getUserFollowerList() {

    const currentUser = this.auth.getCurrentUserInfo();
    if (currentUser === null || currentUser === undefined) {
      return;
    }

    const url = AppSettings.getUserFollowers();
    this.httpclient.post<any>(url, {userId: currentUser.id, offset: 0}, this.auth.getHttpHeader())
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.userList = data.userList;
          return;
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        alert(data.msg);
      });
  }
}
