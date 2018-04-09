import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {MaterialModule} from '../component/material.module';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {MessagesService} from './message/messages.service';
import {ThreadsService} from './thread/thread.service';
import {UsersService} from './user/users.service';
import {FromNowPipe} from './pipes/from-now.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ChatComponent],
  declarations: [
    ChatComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    FromNowPipe
  ],
  providers: [
    MessagesService, ThreadsService, UsersService
  ],
})
export class ChatModule { }
