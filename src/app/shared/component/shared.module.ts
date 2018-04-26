import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material';
import {ConnectionComponent} from './connection/connection.component';
import {EditorServiceComponent} from '../editor/editorService.component';
import {IndexServiceComponent} from '../../pages/index/shared/IndexServiceComponent';
import {JqueryServiceComponent} from '../jquery/jQueryService.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {AskQuestionComponent} from './ask-question/ask-question.component';
import {SendMessageComponent} from './send-message/send-message.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {HttpClientModule} from '@angular/common/http';
import {FromNowPipe} from '../pipes/from-now.pipe';
import {TopicService} from '../../pages/topic/shared/topic.service';
@NgModule({
  declarations: [
    ConnectionComponent,
    AskQuestionComponent,
    SendMessageComponent,
    ChangePasswordComponent,
    FromNowPipe,
  ],
  exports: [
    ConnectionComponent,
    CommonModule,
    AskQuestionComponent,
    SendMessageComponent,
    ChangePasswordComponent,
    FromNowPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    JqueryServiceComponent,
    EditorServiceComponent,
    TopicService,
  ],
  entryComponents: [
    AskQuestionComponent,
    SendMessageComponent,
  ],
})
export class SharedModule { }
