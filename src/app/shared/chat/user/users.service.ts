import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {User} from './user.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UsersService {
  // `currentUser` contains the current user
  // 定义一个异步流，用于发送和处理用户的改变
  // BehaviorSubject 的特点是订阅者订阅后会返回最近一次的结果和当然订阅的最新结果 通俗来说 就是释放订阅前最后一个数据和订阅后接收到的所有数据:
  currentUser: Subject<User> = new BehaviorSubject<User>(null);
  // 加入新的用户
  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}
