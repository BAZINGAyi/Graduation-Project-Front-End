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

  questionHeaderId =  'questionHeaderId';
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

  ngAfterViewInit(): void {
  }

  constructor(private jQueryService: JqueryServiceComponent,
              private editorService: EditorServiceComponent,
              private navigationService: NavigationService,
              private elementRef: ElementRef,
              private route: ActivatedRoute,
              private questionService: QuestionService,
              private feedUtilService: FeedUtilService,
              public authenticationService: AuthenticationService,
              public dialog: MatDialog) {
    this.qId = this.route.snapshot.paramMap.get('qid');
  }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    this.getQuestionDetailById();
  }

  /**
   *  获取问题页面的详细信息
   */
  getQuestionDetailById() {
    const id: number = +this.qId;
    this.questionService
      .getQuestionDetailById(id)
      .subscribe( data => { this.generateData(data); this.questionDetail = data; });
  }

  /**
   * 显示完整的题目内容
   */
  showAllText() {
    this.jQueryService.toggleCssClass('#test123', 'test');
  }

  /**
   * 打开输入回答的编辑框
   */
  openEidtor() {
    this.editorService.appendEditorToContainer(this.QUESTION_ANSWER_EDITOR);
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

  /**
   * 设置 instruction div 滑动位置
   */
  fixFloatEditorDivPosition() {
    const $ = this.jQueryService.getJqueryObject();

    $.fn.fixedDiv = function(actCls){
      let that = $(this),
        offsetTop = that.offset().top,
        scrollTop;
      // 用于记录正常滚动状态时，距离视窗左侧的高度
      const normalLeftWidth = '';
      function fix() {
        scrollTop = $(document).scrollTop();
        // 滑动的距离大于到视窗顶部的高度 - 减去导航栏的高度
        if (scrollTop > offsetTop - (3.5 * 16) ) {
          that.addClass(actCls);
        } else {
          that.removeClass(actCls);
        }
      }
      fix();
      $(window).scroll(fix);
    };

    $('#' + this.QUESTION_ANSWER_EDITOR).fixedDiv('fix-editor-div');
  }

  /**
   *  控制头部文字的隐藏
   */
  init(data) {
    // 通过自己的创建的节点，来提取传入 html 数据中的纯文本
    // const dom = document.createElement('div');
    // dom.innerHTML = data;
    // const pureText = dom.innerText;
    //
    // // 默认显示字数
    // const len = 100;
    // // 获取div对象
    // const ctn = document.getElementById('normal-padding-column');
    // console.log(ctn);
    // // 获取div里的内容
    // // const content = ctn.innerHTML;
    // const content: string = pureText;
    // console.log('zzz' + content);
    // // 创建<span>元素
    // const span = document.createElement('span');
    // // 创建<a>元素
    // const a = document.createElement('a');
    // // a.style.color = "#FF5252";
    // // span里的内容为content的前len个字符
    // span.innerHTML = content.substring(0, len);
    // // 判断显示的字数是否大于默认显示的字数    来设置a的显示
    // a.innerHTML = content.length > len ? '... 展开' : '';
    // // 让a链接点击不跳转
    // a.href = 'javascript:void(0)';
    //
    // a.onclick = function(){
    //   // 如果a中含有"展开"则显示"收起"
    //   if (a.innerHTML.indexOf('展开') > 0 ) {
    //     a.innerHTML = '<<&nbsp;收起';
    //     span.innerHTML = content;
    //   } else {
    //     a.innerHTML = '... 展开';
    //     span.innerHTML = content.substring(0, len);
    //   }
    // };
    // // 设置div内容为空，span元素 a元素加入到div中
    // ctn.innerHTML = '';
    // ctn.appendChild(span);
    // ctn.appendChild(a);

    // 定义显示的字符数
    const contentLength = 200;
    // 获取要显示的问题内容
    const questionContent = data.question.content.trim();
    // 创建节点用于装载 question 的内容
    const contentDom = document.createElement('div');
    contentDom.innerHTML = questionContent;
    // 从创建的节点中取出 text 文本的前 n 个汉字，作为现实内容的缩略版
    const contentText = contentDom.innerText.trim();
    // 判断是否将内容隐藏
    if (contentText.length > contentLength) {
      this.questionContent = contentText.substr(0, contentLength);
      this.aState = true;
    } else {
      this.questionContent = contentText;
      this.aState = false;
    }
  }

  private generateData(data: any | undefined) {
    console.log(data);
    this.questionTitle = data.question.title;
    this.questionContent = data.question.content;
    this.questionCommentCount = data.question.commentCount;
    this.questionComment = data.comments;
    this.FOLLOWEE_QUESTION_STATE = data.followed;
    // 显示问题的内容描述
    this.init(data);
    // 判断是否有评论
    if (this.questionCommentCount === 0) {
      this.notFoundDataState = true;
    }
  }

  openDetailQuestionContent() {
    // 隐藏精简内容
    const detailContent = document.getElementById(this.SHORT_DESCRIBE_QUESTION);
    detailContent.style.display = 'none';
    this.editorService.generateQuestionDisplayEditor(this.DETAIL_DESCRIBE_QUESTION,
      this.questionDetail.question.content);
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
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '40%',
        height: '350px'
      });
      return;
    }

    const qid: number = +this.qId;
    this.questionService.followQuestion(qid)
      .subscribe( data => {
        if (data.code !== undefined && data.code === 200) {
          this.FOLLOWEE_QUESTION_STATE = true;
        } else {
          alert(data.msg);
        }
      });
  }

  cancelFollowQuestion() {

    if (!this.authenticationService.isLogin()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '40%',
        height: '350px'
      });
      return;
    }

    const  qid: number = +this.qId;
    this.questionService.unFollowQuestion(qid)
      .subscribe( data => {
        if (data.code !== undefined && data.code === 200) {
          this.FOLLOWEE_QUESTION_STATE = false;
        } else {
          alert(data.msg);
        }
      });
  }

  // 点击展开和加载后的内容应该是互为隐藏的

  // TODO 点击展开后肯定是通过 editor 加载内容，因为是由 editor 产生的数据，产生的 html 类需要通过 editor 生成

}
