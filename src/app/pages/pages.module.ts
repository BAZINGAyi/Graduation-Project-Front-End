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


@NgModule({
  imports: [
    PagesRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    CommonModule,
    // FormsModule,
    IndexModule,
    QuestionModule,
    // material
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
  declarations: [ NavigationComponent, PagesComponent ],
  exports:      [ PagesComponent ],
  providers:    [ ProgressBarServiceComponent ]
})
export class PagesModule {}
