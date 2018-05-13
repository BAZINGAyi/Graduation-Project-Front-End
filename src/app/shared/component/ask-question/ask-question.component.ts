import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EditorServiceComponent} from '../../editor/editorService.component';
import {MatDialogRef} from '@angular/material';
import {TopicService} from '../../../pages/topic/shared/topic.service';
import {IndexTopic} from '../../model/topicIndex.model';
import {AppSettings} from '../../url/AppSettings';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {WendaUtils} from '../../util/wendaUtil.service';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Question} from '../../model/question/question.model';
import {CommentSon} from '../../model/question/commentSon.model';
import {Comment} from '../../model/question/comment.model';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit, AfterViewInit {
  myControl: FormControl = new FormControl();

  topicNameList: IndexTopic[];

  questionTitle = '';

  topicId = '';

  options = [
    '加载中',
  ];

  // 用于添加 editor 的 id
  ASK_QUESTION_EDITOR_ID = 'askQuestionViewId';

  NORMAL_ASK_QUESTION = 'NORMAL_ASK_QUESTION';

  // 编辑问题需要用到的属性
  EDIT_ASK_QUESTION = 'EDIT_ASK_QUESTION';
  question: Question;

  // 编辑回答需要用到的属性
  EDIT_COMMENT = 'EDIT_COMMENT';
  comment: Comment;

  CURRENT_PAGE_TYPE = '';

  ngAfterViewInit(): void {
    // 需要在页面渲染完成后，才能添加编辑器
    this.initEditor();
  }


  constructor(private editorServiceComponent: EditorServiceComponent,
              public dialogRef: MatDialogRef<AskQuestionComponent>,
              private topicService: TopicService,
              private http: HttpClient,
              private wendaUtils: WendaUtils,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // 获取话题类型
    this.getTopicList();
  }

  initEditor() {

    if (this.CURRENT_PAGE_TYPE === this.NORMAL_ASK_QUESTION) {
      this.editorServiceComponent.appendEditorToContainer(this.ASK_QUESTION_EDITOR_ID, '');

    } else if (this.CURRENT_PAGE_TYPE === this.EDIT_ASK_QUESTION) {
      this.editorServiceComponent.appendEditorToContainer(this.ASK_QUESTION_EDITOR_ID,
        this.question !== null && this.question !== undefined ? this.question.markdownContent : '');

    } else if (this.CURRENT_PAGE_TYPE === this.EDIT_COMMENT) {
      this.editorServiceComponent.appendEditorToContainer(this.ASK_QUESTION_EDITOR_ID,
        this.comment !== null && this.comment !== undefined ? this.comment.markdownContent : '');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getTopicList() {
    this.topicService
      .getTopicList()
      .subscribe( data => {  this.topicNameList = data; this.updatePageContent(); });
  }

  /**
   * 如果编辑器的类型是修改类型，则追加内容
   */
  updatePageContent() {
    if (this.CURRENT_PAGE_TYPE === this.EDIT_ASK_QUESTION) {
      this.questionTitle = this.question.title;
      this.topicId = this.question.topicId + '';
    }
  }

  /**
   * 提交问题
   */
  submitQuestion() {

    if (!this.wendaUtils.checkUserInputLegal(this.questionTitle) ||
      !this.wendaUtils.checkUserInputLegal(this.editorServiceComponent.getEditEditorHtml()) ||
      !this.wendaUtils.checkUserInputLegal(this.questionTitle)||
      !this.wendaUtils.checkUserInputLegal(this.topicId)) {
      alert('请按要求输入内容');
      return;
    }

    const url = AppSettings.getSubmitQuestionUrl();

    this.http.post<any>(
      url,
      {
        title: this.questionTitle,
        content: this.editorServiceComponent.getEditEditorHtml(),
        markdownContent: this.editorServiceComponent.getEditEditorMarkdown(),
        topicId: this.topicId
      },
      this.authenticationService.getHttpHeader()
    )
      .subscribe(data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          alert(data.msg);
          this.wendaUtils.reloadPage();
        } else {
          alert(data.msg);
        }
      });
  }

  /**
   * 编辑已经修改过得问题
   */
  editQuestion() {

    if (!this.wendaUtils.checkUserInputLegal(this.questionTitle) ||
      !this.wendaUtils.checkUserInputLegal(this.editorServiceComponent.getEditEditorHtml()) ||
      !this.wendaUtils.checkUserInputLegal(this.questionTitle)) {
      alert('请按要求输入内容');
      return;
    }

    if (this.question === null && this.question === undefined) {
      return;
    }

    const url = AppSettings.getUpdateQuestionUrl();
    this.http.put<any>(
      url,
      {
        title: this.questionTitle,
        content: this.editorServiceComponent.getEditEditorHtml(),
        markdownContent: this.editorServiceComponent.getEditEditorMarkdown(),
        topicId: this.topicId,
        qid: this.question.id
      },
      this.authenticationService.getHttpHeader()
    )
      .subscribe(data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          alert(data.msg);
          this.wendaUtils.reloadPage();
        } else {
          alert(data.msg);
        }
      });
  }


  /**
   * 编辑回答
   */
  editAnswer() {
    if (!this.wendaUtils.checkUserInputLegal(this.editorServiceComponent.getEditEditorHtml())) {
      alert('请按要求输入内容');
      return;
    }

    if (this.comment.id === null && this.comment.id === undefined) {
      return;
    }

    const url = AppSettings.getUpdateAnswerUrl();
    this.http.put<any>(
      url,
      {
        content: this.editorServiceComponent.getEditEditorHtml(),
        markdownContent: this.editorServiceComponent.getEditEditorMarkdown(),
        commentId: this.comment.id
      },
      this.authenticationService.getHttpHeader()
    )
      .subscribe(data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          alert(data.msg);
          this.wendaUtils.reloadPage();
        } else {
          alert(data.msg);
        }
      });
  }
}
