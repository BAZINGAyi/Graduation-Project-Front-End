import { NgModule } from '@angular/core';
import {DiscoverComponent} from './discover.component';
import {MaterialModule} from '../../shared/component/material.module';
import {ProgressBarServiceComponent} from '../../shared/progressbar/progressBarService.component';
import {PagesSharedModule} from '../shared/pagesShared.module';
import {SharedModule} from '../../shared/component/shared.module';
import { DiscoverFeedsComponent } from './discover-feeds/discover-feeds.component';
import {JqueryServiceComponent} from '../../shared/jquery/jQueryService.component';
import {DiscoverService} from './shared/DiscoverService.service';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PagesSharedModule,
  ],
  declarations: [ DiscoverComponent, DiscoverFeedsComponent ],
  exports:      [ DiscoverComponent ],
  providers:    [ DiscoverService ]
})
export class DiscoverModule { }

