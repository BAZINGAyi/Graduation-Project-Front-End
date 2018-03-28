import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import {ChatModule} from '../../shared/chat/chat.module';
import { FollowComponent } from './follow/follow.component';
import { FansComponent } from './fans/fans.component';
import { FollowQuestionComponent } from './follow-question/follow-question.component';
import {PagesSharedModule} from '../shared/pagesShared.module';
import {PushQuestionComponent} from './push-question/push-question.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ChatModule,
    PagesSharedModule,
  ],
  declarations: [PersonComponent, FollowComponent, FansComponent, FollowQuestionComponent, PushQuestionComponent],
  providers: [EditorServiceComponent],
  exports: [PersonComponent]
})
export class PersonModule { }
