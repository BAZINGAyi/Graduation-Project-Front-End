import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './pages/navigation/navigation.component';

const routes: Routes = [
  { path: 'index', component: NavigationComponent }
];

@NgModule({
  exports: [RouterModule]
})

export class AppRoutingModule { }
