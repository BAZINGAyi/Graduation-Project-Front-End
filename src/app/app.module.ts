import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { ErrorComponentComponent } from './authentication/error-component/error-component.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConnectionComponent } from './shared/component/connection/connection.component';
import {MatCardModule} from '@angular/material';
import {SharedModule} from './shared/component/shared.module';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import {MaterialModule} from './shared/component/material.module';
import {AuthenticationService} from './authentication/authentication.service';
import {UserService} from './authentication/user.service';
import {WendaUtils} from './shared/util/wendaUtil.service';
import {ChangePasswordComponent} from './shared/component/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponentComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    PagesModule,
    MaterialModule,
  ],
  entryComponents:[
    RegisterComponent,
    LoginComponent,
  ],
bootstrap: [AppComponent],
  providers: [
  { provide: APP_BASE_HREF, useValue: '/' },
    AuthenticationService,
    UserService,
    WendaUtils,
]
})
export class AppModule { }
