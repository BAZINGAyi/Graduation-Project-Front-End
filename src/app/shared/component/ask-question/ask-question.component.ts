import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EditorServiceComponent} from '../../editor/editorService.component';
import {MatDialogRef} from '@angular/material';
import {TopicService} from '../../../pages/topic/shared/topic.service';
import {IndexTopic} from '../../model/topicIndex.model';
import {AppSettings} from '../../url/AppSettings';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {WendaUtils} from '../../util/wendaUtil.service';

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

  ngAfterViewInit(): void {
    this.initEditor();
  }


  constructor(private editorServiceComponent: EditorServiceComponent,
              public dialogRef: MatDialogRef<AskQuestionComponent>,
              private topicService: TopicService,
              private http: HttpClient,
              private wendaUtils: WendaUtils,
              private route: ActivatedRoute,
              private router: Router) { }

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
    this.editorServiceComponent.getEditEditorHtml();
    this.editorServiceComponent.getEditEditorMarkdown();

    this.http.post<any>(url, { title: this.questionTitle, content: this.editorServiceComponent.getEditEditorHtml(),
      markdownContent: this.editorServiceComponent.getEditEditorMarkdown(), topicId: this.topicId})
      .subscribe(data => {
        if (data.status !== undefined && data.status === 'success') {
          alert(data.msg);
          this.wendaUtils.reloadPage();
        } else {
          alert(data.msg);
        }
      });
  }
}
