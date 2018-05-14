import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonComponent} from '../person/person.component';
import {PagesSharedModule} from '../shared/pagesShared.module';
import {ChatModule} from '../../shared/chat/chat.module';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {UserIndexComponent} from './user-index.component';
import {ProgressBarServiceComponent} from '../../shared/progressbar/progressBarService.component';
import {WendaUtils} from '../../shared/util/wendaUtil.service';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ChatModule,
    PagesSharedModule,
  ],
  declarations: [UserIndexComponent],
  exports: [UserIndexComponent],
  providers: [EditorServiceComponent, AuthenticationService, ProgressBarServiceComponent, WendaUtils],
})
export class UserIndexModule { }
