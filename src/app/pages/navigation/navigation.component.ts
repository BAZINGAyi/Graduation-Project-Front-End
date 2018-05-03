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

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
  selector: 'app-pages-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})

export class NavigationComponent implements OnInit {

  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  // 判断当前用户是否登陆
  IS_LOGIN = false;

  ngOnInit(): void {
  }

  constructor(public dialog: MatDialog,
              public router: Router,
              public authenticationService: AuthenticationService,
              public wendaUtil: WendaUtils) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );
    // 判断是否登录
    if (this.authenticationService.isLogin() === true) {
      this.IS_LOGIN = true;
    } else {
      this.IS_LOGIN = false;
    }
  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }


  openSendMessage() {

    const dialogRef = this.dialog.open(SendMessageComponent, {
      width: '50%',
      height: '250px'
    });

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
    if (code === 13) {
      alert('hhh');
      // 路由至搜索页面
      this.router.navigate(['/pages/search', { searchContent: event.target.value.trim() }]);
    }
  }

  /**
   * 打开登陆注册框
   */
  openLoginPage() {

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '40%',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  /**
   * 打开注册对话框
   */
  openRegisterPage() {

    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '40%',
      height: '350px'
    });

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
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '40%',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


