import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedComponent} from './feed/feed.component';
import {MaterialModule} from '../../shared/component/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [FeedComponent],
  declarations: [FeedComponent]
})
export class PagesSharedModule { }
