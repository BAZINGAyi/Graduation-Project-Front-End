import { Component, OnInit } from '@angular/core';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {AppSettings} from '../../../shared/url/AppSettings';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {LoginComponent} from '../../../authentication/login/login.component';
import {IndexServiceComponent} from '../../index/shared/IndexServiceComponent';
import {WendaUtils} from '../../../shared/util/wendaUtil.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  notFoundDataState = false;
  notFoundData = '没有数据';

  userList: any;

  constructor(private progressBarService: ProgressBarServiceComponent,
              private indexServiceComponent: IndexServiceComponent,
              public dialog: MatDialog,
              private router: Router,
              public httpclient: HttpClient,
              public auth: AuthenticationService,
              public wendaUtils: WendaUtils) { }

  ngOnInit() {
    this.getUserFolloweeList();
  }

  getUserFolloweeList() {

    const currentUser = this.auth.getCurrentUserInfo();
    if (currentUser === null || currentUser === undefined) {
      return;
    }

    const url = AppSettings.getUserFollowees();
    this.httpclient.post<any>(url, {userId: currentUser.id, offset: 0}, this.auth.getHttpHeader())
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.userList = data.userList;
          return;
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        } else if (data.code === AppSettings.getNoContentHttpResponseCode()) {
          this.notFoundDataState = true;
        }
      });
  }

  cancelFollowUser(user: any) {
    if (!this.wendaUtils.checkUserInputNumberLegal(user.id)) {
      return;
    }

    this.indexServiceComponent.unFollowUser(user.id)
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.wendaUtils.reloadPage();
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        alert(data.msg);
      });
  }

  openProfile(user: any) {
    if (!this.wendaUtils.checkUserInputNumberLegal(user.id)) {
      return;
    }

    this.router.navigate(['pages/profile', { id: user.id} ]);
  }
}
