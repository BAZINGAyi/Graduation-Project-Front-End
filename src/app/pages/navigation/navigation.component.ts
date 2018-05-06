import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatDialog} from '@angular/material';
import {SendMessageComponent} from '../../shared/component/send-message/send-message.component';
import {Router} from '@angular/router';
import {LoginComponent} from '../../authentication/login/login.component';
import {RegisterComponent} from '../../authentication/register/register.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {WendaUtils} from '../../shared/util/wendaUtil.service';
import {ChangePasswordComponent} from '../../shared/component/change-password/change-password.component';
import {AppSettings} from '../../shared/url/AppSettings';
import {HttpClient} from '@angular/common/http';
import {IndexData} from '../../shared/model/index-data.model';
import {PersonComponent} from '../person/person.component';

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
  selector: 'app-pages-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})

export class NavigationComponent implements OnInit {

  headUrl = '';

  stateCtrl: FormControl;
  searchValue: Observable<IndexData[]>;

  // 判断当前用户是否登陆
  IS_LOGIN = false;

  ngOnInit(): void {
    this.initUserData();
  }

  constructor(public dialog: MatDialog,
              public router: Router,
              public authenticationService: AuthenticationService,
              public wendaUtil: WendaUtils,
              public httpClient: HttpClient) {

    this.stateCtrl = new FormControl();

    // 判断是否登录
    if (this.authenticationService.isLogin() === true) {
      this.IS_LOGIN = true;
    } else {
      this.IS_LOGIN = false;
    }

  }

  initUserData() {
    const currentUser = this.authenticationService.getCurrentUserInfo();
    this.headUrl = currentUser.headUrl;
  }


  openSendMessage() {

    const dialogRef = this.dialog.open(SendMessageComponent, AppSettings.getDialogSendMessageConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  /**
   * 处理回车事件
   */

  handleSearchEvent(event) {
    const theEvent = event || window.event;
    const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    // 按下回车键
    if (code === 13) {
      // 路由至搜索页面
      this.router.navigate(['/pages/search', { searchContent: event.target.value.trim() }]);
      event.preventDefault();
    } else {
      // 按下键盘键
      const searchUrl = AppSettings.getSearchQuestionList(event.target.value, 0);
      this.searchValue = this.httpClient
        .get<IndexData[]>(searchUrl);
    }
  }

  /**
   * 打开登陆注册框
   */
  openLoginPage() {

    const dialogRef = this.dialog.open(LoginComponent, AppSettings.getDialogLoginConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  /**
   * 打开注册对话框
   */
  openRegisterPage() {

    const dialogRef = this.dialog.open(RegisterComponent, AppSettings.getDialogRegisterConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/pages/']);
    this.wendaUtil.reloadPage();
  }

  /**
   * 打开修改密码 dialog
   */
  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, AppSettings.getDialogLoginConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMyProfile() {
    this.router.navigate(['pages/person', { id: PersonComponent.MY_PROFILE} ]);
  }

}


