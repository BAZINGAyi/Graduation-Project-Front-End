import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/component/shared.module';
import {MaterialModule} from '../../shared/component/material.module';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
  ],
  declarations: []
})
export class SearchModule { }
