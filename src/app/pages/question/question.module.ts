import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { EditorServiceComponent } from '../../shared/editor/editorService.component';
import { QuestionComponent } from './question.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [QuestionComponent],
  declarations: [CommentComponent, QuestionComponent],
  providers: [EditorServiceComponent],
})
export class QuestionModule { }
