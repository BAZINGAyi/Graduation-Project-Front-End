import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {MatDialogRef} from '@angular/material';
import {WendaUtils} from '../../shared/util/wendaUtil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              public dialogRef: MatDialogRef<LoginComponent>,
              public wendaUtil: WendaUtils) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/';
  }

  login(username, password) {
    this.loading = true;
    this.authenticationService.login(username, password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.wendaUtil.reloadPage();
        },
        error => {
          alert('登录失败');
        });
  }

}
