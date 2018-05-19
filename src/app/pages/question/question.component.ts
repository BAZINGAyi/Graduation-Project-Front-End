import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JqueryServiceComponent} from '../../shared/jquery/jQueryService.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import {NavigationService} from '../navigation/shared/navigation.service';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from './question.service';
import {QuestionIndex} from '../../shared/model/question/question-index.model';
import {FeedUtilService} from '../shared/feed-util.service';
import {LoginComponent} from '../../authentication/login/login.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {MatDialog} from '@angular/material';
import {WendaUtils} from '../../shared/util/wendaUtil.service';
import {ProgressBarServiceComponent} from '../../shared/progressbar/progressBarService.component';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../shared/url/AppSettings';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, AfterViewInit {

  // 从主页传来的问题 ID
  qId = '';
  // 用于添加 editor 的 id
  QUESTION_ANSWER_EDITOR = 'QUESTION_ANSWER_EDITOR';
  // 用于展示问题简略描述的 div Id
  SHORT_DESCRIBE_QUESTION = 'SHORT_DESCRIBE_QUESTION';
  // 用于展示问题详细描述的 div Id
  DETAIL_DESCRIBE_QUESTION = 'DETAIL_DESCRIBE_QUESTION';
  // editor state
  EDITOR_STATE = false;

  QUESTION_HEADER_ID =  'QUESTION_HEADER_ID';
  // 接受返回的数据
  questionDetail: QuestionIndex;
  // 问题标题
  questionTitle: string;
  // 问题内容
  questionContent: string;
  // 评论问题数量
  questionCommentCount: number;
  // 评论内容
  questionComment: QuestionComponent[];

  // 简略版问题内容需不需要添加 a 标签
  aState = true;
  aText = '>>阅读全文';

  // 控制收起问题按钮的显示状态
  packUpButtonState = false;

  // 控制显示关注问题或者取消关注问题
  FOLLOWEE_QUESTION_STATE = false;

  notFoundDataState = false;
  notFoundData = '写下评论，成为第一个吃螃蟹的人的吧';

  IS_LOGIN = false;

  ngAfterViewInit(): void {
  }

  constructor(private jQueryService: JqueryServiceComponent,
              private editorService: EditorServiceComponent,
              private navigationService: NavigationService,
              private elementRef: ElementRef,
              private route: ActivatedRoute,
              private questionService: QuestionService,
              private wendaUtils: WendaUtils,
              private http: HttpClient,
              private feedUtilService: FeedUtilService,
              private progressBar: ProgressBarServiceComponent,
              public authenticationService: AuthenticationService,
              private editorServiceComponent: EditorServiceComponent,
              public dialog: MatDialog) {
    this.qId = this.route.snapshot.paramMap.get('qid');
  }

  ngOnInit() {
    this.IS_LOGIN = this.authenticationService.isLogin();
    this.getQuestionDetailById();
  }

  /**
   *  获取问题页面的详细信息
   */
  getQuestionDetailById() {
    this.progressBar.openProgressBar();
    const id: number = +this.qId;
    this.questionService
      .getQuestionDetailById(id)
      .subscribe( data => {
        this.generatePageData(data);
        this.questionDetail = data;
        this.progressBar.closeProgressBar();
        if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          alert("请您重新登录");
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
      });
  }

  /**
   * 打开输入回答的编辑框
   */
  openEidtor() {
    this.editorService.appendEditorToContainer(this.QUESTION_ANSWER_EDITOR, '');
    // this.fixFloatEditorDivPosition();
    // 显示操作编辑框的 button div 隐藏正常 button
    this.EDITOR_STATE = true;
  }

  /**
   * 隐藏编辑框
   */
  closeEditor() {
    this.editorService.hiddenEditEditor(this.QUESTION_ANSWER_EDITOR);
    this.EDITOR_STATE = false;
  }

  private generatePageData(data: any | undefined) {
    this.questionTitle = data.question.title;
    // this.questionContent = data.question.content;
    this.questionCommentCount = data.question.commentCount;
    this.questionComment = data.comments;
    this.FOLLOWEE_QUESTION_STATE = data.followed;
    // 显示问题的内容描述
    this.initQuestionContent(data.question.content);
    // 判断是否有评论
    if (this.questionCommentCount === 0) {
      this.notFoundDataState = true;
    }
  }

  /**
   *  控制头部文字的隐藏
   */
  initQuestionContent(questionContent) {
    // 定义显示的字符数
    const contentLength = AppSettings.getQyestionTextLength();
    // 获取要显示的问题内容
    questionContent =  this.wendaUtils.HTMLDecode(questionContent.trim());
    const contentText = this.wendaUtils.getTextInHTML(questionContent);

    // 判断是否将内容隐藏
    if (contentText.length > contentLength
      || this.isIncludeImage(questionContent)
      || this.wendaUtils.isIncludeIframe(questionContent)) {
      this.questionContent = contentText.substr(0, contentLength);
      this.aState = true;
    } else {
      this.questionContent = contentText;
      this.aState = false;
    }
  }

  isIncludeImage(questionContent) {
    const imgUrl = this.wendaUtils.extractFirstImageUrl(questionContent);
    if (imgUrl === undefined) {
      return false;
    } else {
      return true;
    }
  }

  openDetailQuestionContent() {
    // 隐藏精简内容
    const detailContent = document.getElementById(this.SHORT_DESCRIBE_QUESTION);
    detailContent.style.display = 'none';
    this.editorService.generateQuestionDisplayEditor(this.DETAIL_DESCRIBE_QUESTION,
      this.wendaUtils.HTMLDecode(this.questionDetail.question.content));
    this.aState = false;
    this.packUpButtonState = true;
  }

  closeDetailQuestionContent() {
    // 显示精简内容
    const cardContent = document.getElementById(this.SHORT_DESCRIBE_QUESTION);
    cardContent.style.display = 'block';
    // 隐藏全部内容
    const detailContent = document.getElementById(this.DETAIL_DESCRIBE_QUESTION);
    detailContent.style.display = 'none';
    this.aState = true;
    this.packUpButtonState = false;
  }

  followQuestion() {

    if (!this.authenticationService.isLogin()) {
      const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
      return;
    }

    const qid: number = +this.qId;
    this.questionService.followQuestion(qid)
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.FOLLOWEE_QUESTION_STATE = true;
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        alert(data.msg);
      });
  }

  cancelFollowQuestion() {

    if (!this.authenticationService.isLogin()) {
      const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
      return;
    }

    const  qid: number = +this.qId;
    this.questionService.unFollowQuestion(qid)
      .subscribe( data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.FOLLOWEE_QUESTION_STATE = false;
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()){
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        alert(data.msg);
      });
  }

  submitComment() {

    if (!this.authenticationService.isLogin()) {
      const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
      return;
    }

    this.http.post<any>(AppSettings.getSubmitCommentUrl(),
      { content: this.editorServiceComponent.getEditEditorHtml(),
        markdownContent: this.editorServiceComponent.getEditEditorMarkdown(),
        questionId: this.qId
      })
      .subscribe(data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.wendaUtils.reloadPage();
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        alert(data.msg);
      });
  }

  // 点击展开和加载后的内容应该是互为隐藏的

  // TODO 点击展开后肯定是通过 editor 加载内容，因为是由 editor 产生的数据，产生的 html 类需要通过 editor 生成
}
