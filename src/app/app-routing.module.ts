import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './pages/navigation/navigation.component';
import { PagesComponent } from './pages/pages.component';
import { IndexComponent } from './pages/index/index.component';
import { QuestionComponent } from './pages/question/question.component';
import { ErrorComponentComponent } from './authentication/error-component/error-component.component';

const routes: Routes = [
  { path:'pages', loadChildren: './pages/pages.module#PagesModule',  },
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
  { path: '**', component: ErrorComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
