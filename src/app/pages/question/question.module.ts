import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { EditorServiceComponent } from '../../shared/editor/editorService.component';
import { QuestionComponent } from './question.component';
import { MatExpansionModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatAutocompleteModule, MatButtonToggleModule, MatDividerModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
     // material
     // BrowserAnimationsModule,
     ReactiveFormsModule,
     MatToolbarModule,
     MatButtonModule,
     MatCardModule,
     MatFormFieldModule,
     MatInputModule,
     MatIconModule,
     MatAutocompleteModule,
     MatDividerModule,
     MatButtonToggleModule,
     MatProgressBarModule,
     MatExpansionModule
  ],
  exports : [QuestionComponent],
  declarations: [CommentComponent, QuestionComponent],
  providers: [EditorServiceComponent],
})
export class QuestionModule { }
