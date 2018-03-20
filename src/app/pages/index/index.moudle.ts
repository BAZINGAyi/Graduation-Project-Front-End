import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from './navigation/navigation.component';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PagesComponent} from './pages.component';
import {FeedsComponent} from './index/feeds/feeds.component';
import {IndexFeedsComponent} from './index/index-feeds/index-feeds.component';


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
  declarations: [ IndexFeedsComponent, FeedsComponent, NavigationComponent, PagesComponent ],
  exports:      [ PagesComponent ],
  providers:    [  ]
})
export class PagesModule {}
