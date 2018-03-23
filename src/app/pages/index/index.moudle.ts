import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatToolbarModule,
  MatListModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IndexFeedsComponent} from './index-feeds/index-feeds.component';
import {FeedsComponent} from './feeds/feeds.component';
import {IndexComponent} from './index.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import { HotQuestionComponent } from './hot-question/hot-question.component';
import { IndexProfileComponent } from './index-profile/index-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // material
    BrowserAnimationsModule,
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
    MatExpansionModule,
    MatListModule,
  ],
  declarations: [ IndexFeedsComponent, FeedsComponent, IndexComponent, HotQuestionComponent, IndexProfileComponent ],
  exports:      [ IndexComponent ],
  providers:    [ EditorServiceComponent, ]
})
export class IndexModule {}
