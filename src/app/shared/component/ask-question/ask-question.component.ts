import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EditorServiceComponent} from '../../editor/editorService.component';
import {MatDialogRef} from '@angular/material';
import {TopicService} from '../../../pages/topic/shared/topic.service';
import {IndexTopic} from '../../model/topicIndex.model';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit, AfterViewInit {
  myControl: FormControl = new FormControl();

  topicNameList: IndexTopic[];

  options = [
    'One',
    'Two',
    'Three'
  ];

  // 用于添加 editor 的 id
  askQuestionEditorId = 'askQuestionViewId';

  ngAfterViewInit(): void {
    this.initEditor();
  }


  constructor(private editorServiceComponent: EditorServiceComponent,
              public dialogRef: MatDialogRef<AskQuestionComponent>,
              private topicService: TopicService) { }

  ngOnInit() {
    this.getTopicList();
  }

  initEditor() {
    this.editorServiceComponent.appendEditorToContainer(this.askQuestionEditorId);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getTopicList() {
    this.topicService
      .getTopicList()
      .subscribe( data => {  this.topicNameList = data; });
  }
}
