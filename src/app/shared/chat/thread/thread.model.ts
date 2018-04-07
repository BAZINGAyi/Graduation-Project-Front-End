/**
 * Thread represents a group of Users exchanging Messages
 */
import {Message} from '../message/message.model';

export class Thread {
  id: string;
  lastMessage: Message;
  name: string;
  avatarSrc: string;

  constructor(id?: string,
              name?: string,
              avatarSrc?: string) {
    this.id = id;
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}
