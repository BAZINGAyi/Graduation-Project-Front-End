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
import {IndexModule} from './index/index.moudle';
import {ProgressBarServiceComponent} from '../shared/progressbar/progressBarService.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IndexModule,
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
  declarations: [ NavigationComponent, PagesComponent ],
  exports:      [ PagesComponent ],
  providers:    [ ProgressBarServiceComponent ]
})
export class PagesModule {}
