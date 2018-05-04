
import {CommentSon} from './commentSon.model';
import {Comment} from './comment.model';

export class CommentTotal {

  constructor(public commentSon: CommentSon[],
              public commentParent: Comment,
              public commentInCommentCount: number) {
  }
}
