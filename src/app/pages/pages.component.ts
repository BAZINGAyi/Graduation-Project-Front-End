import {Component, OnInit} from '@angular/core';
import {ProgressBarServiceComponent} from '../shared/progressbar/progressBarService.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {

  INDEX_VIEW_TAG = 'INDEX_TAG';
  QUESTION_VIEW_TAG = 'QUESTION_TAG';
  FANS_VIEW_TAG = 'FANS_VIEW_TAG';
  CURRENT_VIEW_TAG = this.INDEX_VIEW_TAG;

  constructor(private progressBarServiceComponent: ProgressBarServiceComponent) {
  }

  ngOnInit() {
    this.progressBarServiceComponent.closeProgressBar();
  }

}
