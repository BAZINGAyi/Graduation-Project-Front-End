import { Component, OnInit } from '@angular/core';
import {User} from './user/user.model';
import {Thread} from './thread/thread.model';
import {Message} from './message/message.model';
import * as moment from 'moment';
import {MessagesService} from './message/messages.service';
import {ThreadsService} from './thread/thread.service';
import {UsersService} from './user/users.service';

// the person using the app us Juliet
// 初始化用户的的数据
const me: User      = new User('Juliet', 'assets/images/avatars/female-avatar-1.png',
  'zhang1');
const ladycap: User = new User('Lady Capulet', 'assets/images/avatars/female-avatar-2.png',
  'zhang2');
const echo: User    = new User('Echo Bot', 'assets/images/avatars/male-avatar-1.png', 'zhnag3');
const rev: User     = new User('Reverse Bot', 'assets/images/avatars/female-avatar-4.png', 'zhang4');
const wait: User    = new User('Waiting Bot', 'assets/images/avatars/male-avatar-2.png', 'zhang5');

// 面板中的线程数据
const tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
const tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc);
const tRev: Thread     = new Thread('tRev', rev.name, rev.avatarSrc);
const tWait: Thread    = new Thread('tWait', wait.name, wait.avatarSrc);

// 消息加数据
const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I\'ll reverse whatever you send me`,
    thread: tRev
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(messagesService: MessagesService,
              threadsService: ThreadsService,
              usersService: UsersService) {
    // TODO make `messages` hot
    messagesService.messages.subscribe(() => ({}));

    // set "Juliet" as the current user
    usersService.setCurrentUser(me);

    // create the initial messages
    initialMessages.map( (message: Message) => messagesService.addMessage(message) );

    threadsService.setCurrentThread(tEcho);
  }

  ngOnInit() {
  }

}
