import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedComponent} from './feed/feed.component';
import {MaterialModule} from '../../shared/component/material.module';
import {SharedModule} from '../../shared/component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [FeedComponent],
  declarations: [FeedComponent]
})
export class PagesSharedModule { }
