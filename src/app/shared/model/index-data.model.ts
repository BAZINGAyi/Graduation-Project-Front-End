import {User} from './user.model';
import {Question} from './question.model';


export class IndexData {

  constructor(public followCount: number,
              public user: User,
              public question: Question) {
  }
}
