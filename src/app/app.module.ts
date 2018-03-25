import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { ErrorComponentComponent } from './authentication/error-component/error-component.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConnectionComponent } from './shared/component/connection/connection.component';
import {MatCardModule} from '@angular/material';
import {SharedModule} from './shared/component/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppModule { }
