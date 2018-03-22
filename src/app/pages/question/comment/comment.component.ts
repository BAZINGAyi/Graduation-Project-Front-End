import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { EditorServiceComponent } from '../../../shared/editor/editorService.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {

  @ViewChild("editorcomment", {read: ElementRef}) editorComment: ElementRef;

  ngAfterViewInit(): void {
  }

  constructor(private editorServiceComponent: EditorServiceComponent) { }

  ngOnInit() {
    this.editorServiceComponent.appendEditorToContainer(this.editorComment);
  }

}
