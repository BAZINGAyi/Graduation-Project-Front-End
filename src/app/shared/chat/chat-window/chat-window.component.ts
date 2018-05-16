import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Thread} from '../thread/thread.model';
import {Message} from '../message/message.model';
import {User} from '../user/user.model';
import {MessagesService} from '../message/messages.service';
import {ThreadsService} from '../thread/thread.service';
import {UsersService} from '../user/users.service';
import * as _ from 'lodash';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message; // message 中包含 user 和 thread 的信息
  currentUser: User;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService,
              public el: ElementRef,
              public dialog: MatDialog,
              private httpClient: HttpClient,
              private auth: AuthenticationService) { }

  ngOnInit() {
    // 获取聊天框的 message
    this.messages = this.threadsService
      .currentThreadMessages
      .map((messages: Message[]) => {
        // 将 message 按照时间排序
        const messages1: Message[] = _.values(messages);
        // console.log('zzzzzzzzzzz');
        console.log(messages1);
        // console.log('zzzz');
        return _.sortBy(messages1, (m: Message) => m.sentAt);
      });

    this.draftMessage = new Message();

    // 更新当前聊天页的所在thread
    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    // 更新当前页面的 user
    this.usersService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });

    // 当消息发生变化时，滚动到最下面
    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;

    alert(this.currentUser.id);
    alert(this.currentThread.name);

    this.messagesService.addMessage(m);
    // 相当于清空 draftMessage 的数据
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
