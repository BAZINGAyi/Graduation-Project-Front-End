import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {IndexData} from '../../model/index-data.model';
import {AppSettings} from '../../url/AppSettings';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user.model';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Message} from '../../chat/message/message.model';
import {LoginComponent} from '../../../authentication/login/login.component';
import {WendaUtils} from '../../util/wendaUtil.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  myControl: FormControl = new FormControl();

  searchValue: User[];

  message:  '';

  username: '';

  users = [
    'One',
    'Two',
    'Three'
  ];
  sendToUsername: '';


  constructor(public dialogRef: MatDialogRef<SendMessageComponent>,
              public httpClient: HttpClient,
              private authenticationService: AuthenticationService,
              private wendaUtils: WendaUtils,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getSearchResult(event) {
    const searchUrl = AppSettings.getSearchUserList(event.target.value, 0);
    this.httpClient
      .get<any>(searchUrl, this.authenticationService.getHttpHeader()).subscribe( data => { this.searchValue = data.userList; } );
  }

  sendMessage() {
    if (!this.wendaUtils.checkUserInputLegal(this.username) || !this.wendaUtils.checkUserInputLegal(this.message)) {
      alert('输入不合法');
    }

    const url = AppSettings.getSendMessage();
    this.httpClient.post<any>(url, {toName: this.username, content: this.message },
      this.authenticationService.getHttpHeader())
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          alert('发送成功，请等待回复');
          this.closeDialog();
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
      });
  }

  getMessage(value: any) {
    this.username = value;
  }
}
