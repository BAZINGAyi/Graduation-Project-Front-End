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
  EDIT_ASK_QUESTION = 'EDIT_ASK_QUESTION';
  EDIT_COMMENT = 'EDIT_COMMENT';
  CURRENT_PAGE_TYPE = '';

  ngAfterViewInit(): void {
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
    this.getTopicList();
  }

  initEditor() {
    this.editorServiceComponent.appendEditorToContainer(this.ASK_QUESTION_EDITOR_ID);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getTopicList() {
    this.topicService
      .getTopicList()
      .subscribe( data => {  this.topicNameList = data; });
  }

  /**
   * 提交问题
   */
  submitQuestion() {

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
        if (data.status !== undefined && data.status === 'success') {
          alert(data.msg);
          this.wendaUtils.reloadPage();
        } else {
          alert(data.msg);
        }
      });
  }

  editQuestion() {

  }

  editComment() {

  }
}
