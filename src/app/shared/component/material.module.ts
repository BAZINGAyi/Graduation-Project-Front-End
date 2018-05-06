import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
  MatProgressBarModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {ConnectionComponent} from './connection/connection.component';
import {EditorServiceComponent} from '../editor/editorService.component';
import {IndexServiceComponent} from '../../pages/index/shared/IndexServiceComponent';
import {JqueryServiceComponent} from '../jquery/jQueryService.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
  ],
  exports: [
    // material
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule ,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatChipsModule,
    MatSidenavModule,
    MatSelectModule,
  ],
  imports: [
    // material
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatPaginatorModule,
    MatTabsModule,
    MatMenuModule,
    MatChipsModule,
    MatSidenavModule,
    MatSelectModule,
  ],
  providers: [ ]
})
export class MaterialModule { }
