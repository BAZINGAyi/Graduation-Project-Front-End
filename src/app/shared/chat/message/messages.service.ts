import { Injectable } from '@angular/core';
import {User} from '../user/user.model';
import {Thread} from '../thread/thread.model';
import {Message} from './message.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publishReplay';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
  // a stream that publishes new messages only once
  // 用于 topbar 的提示
  // Subject 用于发送通知到多个 observer
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  // 用根据日期，更新聊天中的 message 列表
  // Observable 发送通知到某个 observer
  messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  // 用于更新 threads 中的消息改变
  updates: Subject<any> = new Subject<any>();

  // action streams create 作用是实现一个匿名得函数作为 update 的传入参数，并且调用该方法
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    // updates 的更新方法
    this.messages = this.updates
    // watch the updates and accumulate operations on the messages
      .scan((messages: Message[],
             operation: IMessagesOperation) => {
          const result = operation(messages);
          return result;
        },
        initialMessages)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      // 无论何时订阅 Observable，都提供缓存的一个值和新的订阅值
      .publishReplay(1)
      // 只要有一个订阅，自动调用 connect() 方法 将一个 connectable 恢复成正常的 Observable
      .refCount();

    // `create` takes a Message and then puts an operation (the inner function)
    // on the `updates` stream to add the Message to the list of messages.
    //
    // That is, for each item that gets added to `create` (by using `next`)
    // this stream emits a concat operation function.
    //
    // Next we subscribe `this.updates` to listen to this stream, which means
    // that it will receive each operation that is created
    //
    // Note that it would be perfectly acceptable to simply modify the
    // "addMessage" function below to simply add the inner operation function to
    // the update stream directly and get rid of this extra action stream
    // entirely. The pros are that it is potentially clearer. The cons are that
    // the stream is no longer composable.
    // : IMessagesOperation 是函数返回值的参数
    this.create
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          const messages_new =  messages.concat(message);
          return messages_new;
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the Message object or some other 'immutable' here
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);
  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }
}
