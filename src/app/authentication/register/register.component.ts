import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../../shared/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  register(username, password, mail, describe) {
    this.user.name = username;
    this.user.describe = describe;
    this.user.password = password;
    this.user.mail = mail;
    this.userService.register(this.user)
      .subscribe(
        data => {
          alert('注册成功');
        },
        error => {
          alert("注册失败");
        });
  }

}
