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

@NgModule({
  declarations: [
    ConnectionComponent,
    AskQuestionComponent,
    SendMessageComponent,
  ],
  exports: [ConnectionComponent, CommonModule, AskQuestionComponent, SendMessageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [ JqueryServiceComponent, EditorServiceComponent ],
  entryComponents: [
    AskQuestionComponent,
    SendMessageComponent,
  ],
})
export class SharedModule { }
