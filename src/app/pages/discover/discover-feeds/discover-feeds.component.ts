import { Component, OnInit } from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {DiscoverService} from '../shared/DiscoverService.service';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';
import {DiscoverData} from '../../../shared/model/disvocer/DiscoverData';
import {Feeds} from '../../../shared/model/disvocer/feeds.model';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';

@Component({
  selector: 'app-discover-feeds',
  templateUrl: './discover-feeds.component.html',
  styleUrls: ['./discover-feeds.component.css']
})
export class DiscoverFeedsComponent implements OnInit {

  // feeds 流数据
  feeds: Feeds[];

  constructor(private httpClient: HttpClient,
              private progressBar: ProgressBarServiceComponent) {
  }

  ngOnInit(): void {
    this.getTimeLineFeeds();
  }

  getTimeLineFeeds() {
    this.progressBar.openProgressBar();
    const feedsUrl = AppSettings.getTimeLineFeeds();
    this.httpClient
      .get<DiscoverData>(feedsUrl)
      .subscribe(data => { this.feeds = data.feeds; console.log(data); this.progressBar.closeProgressBar(); });
  }

}
