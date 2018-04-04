import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiscoverComponent} from './discover.component';
import {MaterialModule} from '../../shared/component/material.module';
import {IndexModule} from '../index/index.moudle';
import {SearchModule} from '../search/search.module';
import {QuestionModule} from '../question/question.module';
import {NavigationComponent} from '../navigation/navigation.component';
import {PagesComponent} from '../pages.component';
import {ProgressBarServiceComponent} from '../../shared/progressbar/progressBarService.component';
import {PagesRoutingModule} from '../pages-routing.module';
import {PagesSharedModule} from '../shared/pagesShared.module';
import {SharedModule} from '../../shared/component/shared.module';
import { DiscoverFeedsComponent } from './discover-feeds/discover-feeds.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PagesSharedModule,
    SharedModule,
  ],
  declarations: [ DiscoverComponent, DiscoverFeedsComponent ],
  exports:      [ DiscoverComponent ],
  providers:    [ ProgressBarServiceComponent ]
})
export class DiscoverModule { }

