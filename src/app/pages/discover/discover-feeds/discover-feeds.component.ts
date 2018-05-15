import { Component, OnInit } from '@angular/core';
import {IndexData} from '../../../shared/model/index-data.model';
import {DiscoverService} from '../shared/DiscoverService.service';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';
import {DiscoverData} from '../../../shared/model/disvocer/DiscoverData';
import {Feeds} from '../../../shared/model/disvocer/feeds.model';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {LoginComponent} from '../../../authentication/login/login.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-discover-feeds',
  templateUrl: './discover-feeds.component.html',
  styleUrls: ['./discover-feeds.component.css']
})
export class DiscoverFeedsComponent implements OnInit {

  notFoundDataState = false;
  notFoundData = '没有Feed数据';

  // feeds 流数据
  feeds: Feeds[];

  constructor(private httpClient: HttpClient,
              private progressBar: ProgressBarServiceComponent,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getTimeLineFeeds();
  }

  getTimeLineFeeds() {
    this.progressBar.openProgressBar();
    const feedsUrl = AppSettings.getTimeLineFeeds();
    this.httpClient
      .get<DiscoverData>(feedsUrl, this.authenticationService.getHttpHeader())
      .subscribe(data => {
        if (data.code === AppSettings.getSuccessHttpResponseCode()) {
          this.feeds = data.feeds;
        } else if (data.code === AppSettings.getNoContentHttpResponseCode()) {
          this.notFoundDataState = true;
        } else if (data.code === AppSettings.getUnauthorizedResponseCode()) {
          const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());
        }
        this.progressBar.closeProgressBar();
      });
  }

}
