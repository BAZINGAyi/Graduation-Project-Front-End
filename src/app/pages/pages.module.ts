import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from './navigation/navigation.component';
import {PagesComponent} from './pages.component';
import {IndexModule} from './index/index.moudle';
import {ProgressBarServiceComponent} from '../shared/progressbar/progressBarService.component';
import { QuestionModule } from './question/question.module';
import { QuestionComponent } from './question/question.component';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRoutingModule } from './pages-routing.module';
import {MaterialModule} from '../shared/component/material.module';
import {SearchModule} from './search/search.module';
import {PersonModule} from './person/person.module';
import {AuthenticationService} from '../authentication/authentication.service';
import {WendaUtils} from '../shared/util/wendaUtil.service';


@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule,
    IndexModule,
    QuestionModule,
    SearchModule,
    PersonModule,
    // material
    MaterialModule,
  ],
  declarations: [ NavigationComponent, PagesComponent ],
  exports:      [ PagesComponent ],
  providers:
    [ProgressBarServiceComponent,
      AuthenticationService,
      WendaUtils]
})
export class PagesModule {}
