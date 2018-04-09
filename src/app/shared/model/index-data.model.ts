import {Question} from './question.model';
import {User} from './user.model';

export class IndexData {

  constructor(public followCount: number,
              public user: User,
              public question: Question) {
  }
}
