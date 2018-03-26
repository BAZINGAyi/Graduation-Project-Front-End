import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FansComponent } from './fans.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FansComponent],
  providers: [EditorServiceComponent],
})
export class FansModule { }
