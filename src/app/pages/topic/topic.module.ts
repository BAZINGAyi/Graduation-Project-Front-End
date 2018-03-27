import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import { TopicFeedsComponent } from './topic-feeds/topic-feeds.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
  ],
  declarations: [TopicComponent, TopicFeedsComponent]
})
export class TopicModule { }
