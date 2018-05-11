import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ErrorComponentComponent } from './authentication/error-component/error-component.component';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule',  },
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
  { path: '**', component: ErrorComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
