import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexFeedsComponent} from './index-feeds/index-feeds.component';
import {NavigationComponent} from './navigation/navigation.component';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PagesComponent} from './pages.component';


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
  ],
  declarations: [ IndexFeedsComponent, NavigationComponent, PagesComponent ],
  exports:      [ PagesComponent ],
  providers:    [  ]
})
export class PagesModule {}
