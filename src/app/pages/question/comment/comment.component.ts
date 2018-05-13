import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input} from '@angular/core';
import { EditorServiceComponent } from '../../../shared/editor/editorService.component';
import {QuestionComment} from '../../../shared/model/question/question-comment.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {QuestionService} from '../question.service';
import {LoginComponent} from '../../../authentication/login/login.component';
import {MatDialog} from '@angular/material';
import {WendaUtils} from '../../../shared/util/wendaUtil.service';
import {AskQuestionComponent} from '../../../shared/component/ask-question/ask-question.component';
import {AppSettings} from '../../../shared/url/AppSettings';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() comment: QuestionComment;

  // 用于显示评论的内容 Id
  SHORT_COMMENT_CONTENT_ID = '';

  // 用于展示详细评论内容的 Id
  DETAIL_COMMENT_CONTENT_ID = '';

  // 展示评论的评论的页面
  @ViewChild('commentCommentsList')
  commentCommentsDiv: ElementRef;

  // 统计对评论的评论的数量统计
  commentsCountName = '0条评论';

  likeCount = 0;

  dislikeCount = 0;

  isLiked = 0;

  // 子评论的数量
  sonCommentCount = 100;

  aState = false;
  aText = '>>展开';

  commentContent = '';

  // 每个 feed 流中内容显示的图片地址
  feedContentImgSrc = '';

  // 用于表示某个问题的所有内容是否被加载
  contentState = false;

  PARENT_COMMENT_IS_USER = false;

  commentOfAnswer = '';

  ngAfterViewInit(): void {
    // this.init();
    this.commentCommentsDiv.nativeElement.style.display = 'none';
  }

  constructor(private editorServiceComponent: EditorServiceComponent,
              private authenticationService: AuthenticationService,
              private questionService: QuestionService,
              public dialog: MatDialog,
              private wendaUtils: WendaUtils,
              private router: Router) { }

  ngOnInit() {
     this.SHORT_COMMENT_CONTENT_ID = this.comment.comment.commentParent.id + '';
     this.DETAIL_COMMENT_CONTENT_ID = this.comment.comment.commentParent.id + 'detail';
     this.commentsCountName = this.comment.comment.commentInCommentCount + '条评论';
     this.likeCount = this.comment.likeCount;
     this.dislikeCount = this.comment.dislikeCount;
     this.isLiked = this.comment.liked;
     this.sonCommentCount = this.comment.comment.commentInCommentCount;
     this.PARENT_COMMENT_IS_USER = this.comment.parentCommentIsUser;
    this.generateFeed();
  }

  /**
   * 打开对评论的评论页面
   */
  openCommentComments() {

    if (this.comment.comment.commentSon.length === 0) {
      return;
    }

    const divState = this.commentCommentsDiv.nativeElement.style.display;
    if (divState === 'block') {
      this.commentCommentsDiv.nativeElement.style.display = 'none';
    } else if (divState === 'none') {
      this.commentCommentsDiv.nativeElement.style.display = 'block';
    }

    this.commentsCountName = '收起评论列表';
  }

  likeComment() {

    if (!this.authenticationService.isLogin()) {
        const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        return;
    }

    const currentUser = this.authenticationService.getCurrentUserInfo();
    const userId = currentUser.id;
    const commentId = this.comment.comment.commentParent.id;
    // 等于 1 证明用户已经点过赞了
    if (this.isLiked === 1) {
      alert('您已经点过赞了');
      return;
    }

    this.questionService.likeComment(userId, commentId)
      .subscribe( data => {
        if (data.code === 200) {
          this.likeCount = data.likeCount;
          this.dislikeCount = data.dislikeCount;
          this.isLiked = 1;
        } else {
          alert(data.msg);
        }
      });
  }

  dislikeComment() {

    if (!this.authenticationService.isLogin()) {
      const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
      return;
    }

    const currentUser = this.authenticationService.getCurrentUserInfo();
    const userId = currentUser.id;
    const commentId = this.comment.comment.commentParent.id;
    // 等于 0 证明用户已经点过踩了
    if (this.isLiked === -1) {
      alert('您已经恶心过这个回答了');
      return;
    }

    this.questionService.dislikeComment(userId, commentId)
      .subscribe( data => {
        if (data.code === 200) {
          this.likeCount = data.likeCount;
          this.dislikeCount = data.dislikeCount;
          this.isLiked = -1;
        } else {
          alert(data.msg);
        }
      });
  }

  submitCommentOfAnswer() {

    const entityNumber = this.comment.comment.commentParent.id;

    if (!this.wendaUtils.checkUserInputLegal(this.commentOfAnswer) ||
    !this.wendaUtils.checkUserInputNumberLegal(entityNumber)) {
      alert('请输入合法内容');
      return;
    }

    this.questionService.submitCommentOfAnswer(this.commentOfAnswer, entityNumber)
      .subscribe( data => {
        if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogQuestionConfig());
        } else if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.wendaUtils.reloadPage();
        }
        alert(data.msg);
      });
  }

  /**
   * 生成 feed 内容
   */
  generateFeed() {
    this.generateFeedContent();
    this.generateFeedContentImg();
  }

  /**
   * 生成每个 feed 流的内容
   */
  generateFeedContent() {
    // 定义显示的字符数
    const contentLength = 150;
    // 获取要显示的问题内容
    const questionContent = this.wendaUtils.HTMLDecode(this.comment.comment.commentParent.content.trim());
    const contentText = this.wendaUtils.getTextInHTML(questionContent);
    // 判断是否将内容隐藏
    if (contentText.length > contentLength || this.wendaUtils.isIncludeImage(questionContent)) {
      this.commentContent = contentText.substr(0, contentLength);
      this.aState = true;
    } else {
      this.commentContent = contentText;
      this.aState = false;
    }
  }

  /**
   * 生成每个 feed 中的 content img 地址
   */
  generateFeedContentImg() {
    // '<img class="yahoo" src="https://material.angular.io/assets/img/examples/shiba1.jpg" alt="yahoo logo" />'
    const questionContent = this.wendaUtils.HTMLDecode(this.comment.comment.commentParent.content.trim());
    const imageUrl = this.wendaUtils.extractFirstImageUrl(questionContent);
    if (imageUrl !== undefined) {
      this.feedContentImgSrc = imageUrl;
    }
  }

  openCommentDetailContent() {
    // 隐藏问题的简述内容
    const cardContent = document.getElementById(this.SHORT_COMMENT_CONTENT_ID);
    cardContent.style.display = 'none';
    this.editorServiceComponent.generateDisplayEditor(
      this.DETAIL_COMMENT_CONTENT_ID,
      this.wendaUtils.HTMLDecode((this.comment.comment.commentParent.content.trim())),
      ''
    );
    this.contentState = true;
  }

  hiddenCommentContent() {
    // 显示精简内容
    const cardContent = document.getElementById(this.SHORT_COMMENT_CONTENT_ID);
    cardContent.style.display = 'block';
    // 隐藏全部内容
    const detailContent = document.getElementById(this.DETAIL_COMMENT_CONTENT_ID);
    detailContent.style.display = 'none';
    // 隐藏显示按钮
    this.contentState = false;
  }

  /**
   * 修改评论内容
   */
  editAnswer() {
    const dialogRef = this.dialog.open(AskQuestionComponent, AppSettings.getDialogQuestionConfig());
    dialogRef.componentInstance.CURRENT_PAGE_TYPE = 'EDIT_COMMENT';
    dialogRef.componentInstance.comment = this.comment.comment.commentParent;
  }

  /**
   * 删除评论内容
   */
  deleteAnswer() {

    const answerId = this.comment.comment.commentParent.id;

    if (answerId === null || answerId === undefined) {
      return;
    }

    this.questionService.deleteAnswer(answerId)
      .subscribe( data => {
      if (data.code === AppSettings.getUnauthorizedResponseCode()) {
        const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogQuestionConfig());
      } else if (data.code === AppSettings.getSuccessHttpResponseCode()) {
        this.wendaUtils.reloadPage();
      }
      alert(data.msg);
    });
  }

  openProfile() {
    const userId = this.comment.user.id;
    this.router.navigate(['pages/profile', { id: userId} ]);
  }
}
