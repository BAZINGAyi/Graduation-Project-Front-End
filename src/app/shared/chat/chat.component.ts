import { Component, OnInit } from '@angular/core';
import {User} from './user/user.model';
import {Thread} from './thread/thread.model';
import {Message} from './message/message.model';
import * as moment from 'moment';
import {MessagesService} from './message/messages.service';
import {ThreadsService} from './thread/thread.service';
import {UsersService} from './user/users.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication.service';
import {AppSettings} from '../url/AppSettings';
import {LoginComponent} from '../../authentication/login/login.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  notFoundDataState = false;
  notFoundData = '没有数据';

  constructor(messagesService: MessagesService,
              threadsService: ThreadsService,
              public dialog: MatDialog,
              usersService: UsersService,
              private httpClient: HttpClient,
              private auth: AuthenticationService) {
    // TODO make `messages` hot
    messagesService.messages.subscribe(() => ({}));

    const url = AppSettings.getMessageList();
    this.httpClient.get<any>(url, this.auth.getHttpHeader())
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          // 添加分组 message
          const messages: Message[] = data.messageList;
          messages.map( (message: Message) => messagesService.addMessage(message));
          // 添加某个thread的详细内容
          const threadMessages = data.firstThreadMessages;
          threadMessages.map( (message: Message) => messagesService.addMessage(message));
          // 设置 currentThread
          threadsService.setCurrentThread(data.currentThread);
          usersService.setCurrentUser(data.currentUser);
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        } else if (data.code === AppSettings.getNoContentHttpResponseCode()) {
          this.notFoundDataState = false;
        }
      });
  }

  ngOnInit() {
  }

}
