import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { QuestionComponent } from "./question/question.component";
import { IndexComponent } from "./index/index.component";

const routes: Routes =
[
  {
      path: '', component: PagesComponent,
      children:
      [
          { path: '', component: IndexComponent },
          { path: 'index', component: IndexComponent },
          { path: 'question', component: QuestionComponent }
      ]
  },
{
    path: 'question', component: QuestionComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
