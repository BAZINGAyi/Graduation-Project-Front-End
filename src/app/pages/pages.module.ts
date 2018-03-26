import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from './navigation/navigation.component';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PagesComponent} from './pages.component';
import {IndexModule} from './index/index.moudle';
import {ProgressBarServiceComponent} from '../shared/progressbar/progressBarService.component';
import { QuestionModule } from './question/question.module';
import { QuestionComponent } from './question/question.component';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRoutingModule } from './pages-routing.module';
import {ConnectionComponent} from '../shared/component/connection/connection.component';
import {MaterialModule} from '../shared/component/material.module';
import {SearchModule} from './search/search.module';
import { FeedComponent } from './shared/feed/feed.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule,
    IndexModule,
    QuestionModule,
    SearchModule,
    // material
    MaterialModule,
  ],
  declarations: [ NavigationComponent, PagesComponent ],
  exports:      [ PagesComponent ],
  providers:    [ ProgressBarServiceComponent ]
})
export class PagesModule {}
