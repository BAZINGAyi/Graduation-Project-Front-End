import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {JqueryServiceComponent} from '../../shared/jquery/jQueryService.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-pages-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})

export class DiscoverComponent implements OnInit {

  IS_LOGIN = false;

  constructor(private jqueryServiceComponent: JqueryServiceComponent,
              public dialog: MatDialog,
              private router: Router,
              public authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.IS_LOGIN = this.authenticationService.isLogin();
  }
}

