
import {Comment} from './comment.model';
import {CommentTotal} from './commentTotal.model';
import {User} from '../user.model';


export class QuestionComment {

  constructor(public likeCount: number,
              public dislikeCount: number,
              public liked: number,
              public user: User,
              public comment: CommentTotal) {
  }
}
