import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs/';
import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import * as _ from 'lodash';
import {connectableObservableDescriptor} from 'rxjs/observable/ConnectableObservable';

@Injectable()
export class ThreadsService {

  // `threads` is a observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads: Observable<Thread[]>;

  // `currentThread` contains the currently selected thread
  currentThread: Subject<Thread> =
    new BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService) {
    // console.log('-----threadService工作开始------');

    // console.log('TODO1 从messageService取出数据');
    // 将 messages 的数据转换成 thread 的数据结构
    this.threads = messagesService.messages
      .map( (messages: Message[]) => {
        // 我想这里涉及成键值对的原因是面板得数量仅和 messages 中 thread.id 的数量有关
        const threads: {[key: string]: Thread} = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;
          // Cache the most recent message for each thread
          const messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage ||
            messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      })
      .map( threads => threads);

    // 按照时间将 threads 排序成页面上要求的排序,并转换成数组返回
    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      })
      .map( threads => {
        // console.log('TODO2 将 thread 按照时间排序成 orderThreads'); console.log(threads);
        return threads; });

    // 提供当前聊天窗口 messages 的数组值
    this.currentThreadMessages = this.currentThread
      .combineLatest(messagesService.messages,
        (currentThread: Thread, messages: Message[]) => {
          if (currentThread && messages.length > 0) {
            // 当前聊天窗口中，所有的消息都是已读的状态
            return _.chain(messages)
              .filter((message: Message) =>
                (message.thread.id === currentThread.id))
              .map((message: Message) => {
                message.isRead = true;
                return message; })
              .value();
          } else {
            return [];
          }
        })
      .map( messages => {
        // console.log('TODO1 输出当前threadMessage(聊天框)的值'); console.log(messages);
        return messages;
      });

    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }

}

