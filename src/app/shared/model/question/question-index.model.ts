import {User} from '../user.model';
import {Question} from './question.model';
import {QuestionComment} from './question-comment.model';

export class QuestionIndex {

  constructor(public followCount: number,
              public followed: boolean,
              public question: Question,
              public user: User,
              public comments: QuestionComment[],
              public code: number) {
  }
}
