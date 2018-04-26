import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedComponent} from './feed/feed.component';
import {MaterialModule} from '../../shared/component/material.module';
import {SharedModule} from '../../shared/component/shared.module';
import { NotFoundDataComponent } from './not-found-data/not-found-data.component';
import { TimeLineFeedComponent } from './time-line-feed/time-line-feed.component';
import { FeedActionComponent } from './feed-action/feed-action.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    FeedComponent,
    NotFoundDataComponent,
    TimeLineFeedComponent,
    FeedActionComponent
  ],
  declarations: [
    FeedComponent,
    NotFoundDataComponent,
    TimeLineFeedComponent,
    FeedActionComponent
  ]
})
export class PagesSharedModule { }
