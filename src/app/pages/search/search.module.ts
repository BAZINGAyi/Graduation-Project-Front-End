import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';
import { SearchComponent } from './search.component';
import {PagesSharedModule} from '../shared/pagesShared.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PagesSharedModule,
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule { }
