import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import { TopicFeedsComponent } from './topic-feeds/topic-feeds.component';
import {PagesSharedModule} from '../shared/pagesShared.module';
import {TopicService} from './shared/topic-service.service';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PagesSharedModule,
  ],
  declarations: [TopicComponent, TopicFeedsComponent],
  providers: [TopicService],
})
export class TopicModule { }
