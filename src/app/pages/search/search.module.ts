import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import { SearchComponent } from './search.component';
import {PagesSharedModule} from '../shared/pagesShared.module';
import {JqueryServiceComponent} from '../../shared/jquery/jQueryService.component';
import {ProgressBarServiceComponent} from '../../shared/progressbar/progressBarService.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {DiscoverService} from '../discover/shared/DiscoverService.service';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PagesSharedModule,
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent],
  providers:    [ EditorServiceComponent, JqueryServiceComponent, EditorServiceComponent,
    ProgressBarServiceComponent, DiscoverService, AuthenticationService ]
})
export class SearchModule { }
