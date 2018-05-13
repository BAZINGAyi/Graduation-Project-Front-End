import {User} from '../user.model';
import {Comment} from './comment.model';

export class CommentSon {

  constructor(public user: User,
              public comment: Comment,
              public sonCommentIsUser: boolean) {
  }
}
