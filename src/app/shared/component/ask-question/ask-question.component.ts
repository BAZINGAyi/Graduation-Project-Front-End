import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EditorServiceComponent} from '../../editor/editorService.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit, AfterViewInit {
  myControl: FormControl = new FormControl();

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
              public dialogRef: MatDialogRef<AskQuestionComponent>) { }

  ngOnInit() {
  }

  initEditor() {
    this.editorServiceComponent.appendEditorToContainer(this.askQuestionEditorId);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
