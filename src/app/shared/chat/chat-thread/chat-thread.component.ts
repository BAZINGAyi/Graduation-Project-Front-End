import {Component, Input, OnInit} from '@angular/core';
import {Thread} from '../thread/thread.model';
import {ThreadsService} from '../thread/thread.service';
import {AppSettings} from '../../url/AppSettings';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Message} from '../message/message.model';
import {LoginComponent} from '../../../authentication/login/login.component';
import {MessagesService} from '../message/messages.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {

  isFirstClick = true;

  @Input() thread: Thread;
  selected = false;

  constructor(public threadsService: ThreadsService,
              private messagesService: MessagesService,
              public dialog: MatDialog,
              private httpClient: HttpClient,
              private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    // 提示新消息到来
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void {
    const threadId: string = this.thread.id + '';
    // 难点是屏蔽已经请求后的数据
    const alreadyRequestThreadId: string = localStorage.getItem('alreadyRequestThreadId') + '';
    if (this.isFirstClick === true && threadId !== alreadyRequestThreadId) {
       this.isFirstClick = false;
       this.getConversationList(threadId);
    }

    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }

  getConversationList(conversationId: string) {
    const url = AppSettings.getConversationList(conversationId);
    this.httpClient.get<any>(url, this.auth.getHttpHeader())
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          const messages: Message[] = data.messageList;
          messages.map( (message: Message) => this.messagesService.addMessage(message));
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
      });
  }
}
