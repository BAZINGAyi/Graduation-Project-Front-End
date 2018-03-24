import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { QuestionComponent } from "./question/question.component";
import { IndexComponent } from "./index/index.component";
import { CanActivate } from '@angular/router';


const routes: Routes = 
[
    
{ 
    path:'index', component: IndexComponent,
    // children: 
    // [
    //     { path: '', component: IndexComponent },
    //     { path:'question', component: QuestionComponent }
    // ]
},
{
    path:'question', component: QuestionComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
