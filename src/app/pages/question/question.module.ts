import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { EditorServiceComponent } from '../../shared/editor/editorService.component';
import { QuestionComponent } from './question.component';
import { MatExpansionModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatAutocompleteModule, MatButtonToggleModule, MatDividerModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import {JqueryServiceComponent} from '../../shared/jquery/jQueryService.component';
import { QuestionCommentsComponent } from './question-comments/question-comments.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
  ],
  exports : [QuestionComponent],
  declarations: [CommentComponent, QuestionComponent, QuestionCommentsComponent],
  providers: [EditorServiceComponent, JqueryServiceComponent],
})
export class QuestionModule { }
