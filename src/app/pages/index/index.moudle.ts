import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IndexFeedsComponent} from './index-feeds/index-feeds.component';
import {FeedsComponent} from './feeds/feeds.component';
import {IndexComponent} from './index.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // material
    BrowserAnimationsModule,
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
    MatExpansionModule
  ],
  declarations: [ IndexFeedsComponent, FeedsComponent, IndexComponent],
  exports:      [ IndexComponent ],
  providers:    [  ]
})
export class IndexModule {}
