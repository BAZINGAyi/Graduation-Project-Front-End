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
import { MyCommentQuestionsComponent } from './my-comment-questions/my-comment-questions.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthenticationService} from '../../authentication/authentication.service';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ChatModule,
    PagesSharedModule,
  ],
  declarations: [
    PersonComponent,
    FollowComponent,
    FansComponent,
    FollowQuestionComponent,
    PushQuestionComponent,
    MyCommentQuestionsComponent,
    ProfileComponent
  ],
  providers: [EditorServiceComponent, AuthenticationService],
  exports: [PersonComponent]
})
export class PersonModule { }
