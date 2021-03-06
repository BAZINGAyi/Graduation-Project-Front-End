import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { QuestionComponent } from './question/question.component';
import { IndexComponent } from './index/index.component';
import {DiscoverComponent} from './discover/discover.component';
import {TopicComponent} from './topic/topic.component';
import {PersonComponent} from './person/person.component';
import {SearchComponent} from './search/search.component';

const routes: Routes =
[
  {
      path: '', component: PagesComponent,
      children:
      [
          { path: '', component: IndexComponent },
          { path: 'index', component: IndexComponent },
          { path: 'question', component: QuestionComponent },
          { path: 'discover', component: DiscoverComponent },
          { path: 'topic', component: TopicComponent },
          { path: 'person', component: PersonComponent },
          { path: 'search', component: SearchComponent },
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
