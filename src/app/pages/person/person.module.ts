import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import {ChatModule} from '../../shared/chat/chat.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ChatModule,
  ],
  declarations: [PersonComponent],
  providers: [EditorServiceComponent],
  exports: [PersonComponent]
})
export class PersonModule { }
