import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesModule} from './pages/pages.moudle';
import {EditorServiceComponent} from './shared/editor/editorService.component';
import { HotQuestionComponent } from './pages/index/hot-question/hot-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HotQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
  ],
  providers: [EditorServiceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
