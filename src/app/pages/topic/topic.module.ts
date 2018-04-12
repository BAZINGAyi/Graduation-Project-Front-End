import { NgModule } from '@angular/core';
import { TopicComponent } from './topic.component';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import { TopicFeedsComponent } from './topic-feeds/topic-feeds.component';
import {PagesSharedModule} from '../shared/pagesShared.module';
import {JqueryServiceComponent} from '../../shared/jquery/jQueryService.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import {TopicService} from './shared/topic.service';


@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PagesSharedModule,
  ],
  declarations: [TopicComponent, TopicFeedsComponent],
  providers: [EditorServiceComponent, JqueryServiceComponent, TopicService, EditorServiceComponent],
})
export class TopicModule { }
