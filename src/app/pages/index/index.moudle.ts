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
import {IndexComponent} from './index.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import { HotQuestionComponent } from './hot-question/hot-question.component';
import { IndexProfileComponent } from './index-profile/index-profile.component';
import { JqueryServiceComponent } from '../../shared/jquery/jQueryService.component';
import { IndexServiceComponent } from './shared/IndexServiceComponent';
import {ConnectionComponent} from '../../shared/component/connection/connection.component';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import {PagesModule} from '../pages.module';
import {PagesSharedModule} from '../shared/pagesShared.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PagesSharedModule,
  ],
  declarations: [ IndexFeedsComponent, IndexComponent, HotQuestionComponent, IndexProfileComponent ],
  exports:      [ IndexComponent ],
  providers:    [ EditorServiceComponent, JqueryServiceComponent, IndexServiceComponent, EditorServiceComponent ]
})
export class IndexModule {}
