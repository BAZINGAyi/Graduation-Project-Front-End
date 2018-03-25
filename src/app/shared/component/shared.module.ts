import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material';
import {ConnectionComponent} from './connection/connection.component';
import {EditorServiceComponent} from '../editor/editorService.component';
import {IndexServiceComponent} from '../../pages/index/shared/IndexServiceComponent';
import {JqueryServiceComponent} from '../jquery/jQueryService.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ConnectionComponent,
  ],
  exports: [ConnectionComponent],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    // CommonModule,
    MatCardModule,
  ],
  providers: [ JqueryServiceComponent ]
})
export class SharedModule { }
