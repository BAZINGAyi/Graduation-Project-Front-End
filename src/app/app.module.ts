import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorServiceComponent} from './shared/editor/editorService.component';
import { HotQuestionComponent } from './pages/index/hot-question/hot-question.component';
import { PagesModule } from './pages/pages.module';
import { APP_BASE_HREF } from '@angular/common';
import { ErrorComponentComponent } from './authentication/error-component/error-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppModule { }
