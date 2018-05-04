import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../shared/url/AppSettings';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(AppSettings.getLoginUrl(), { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  public isLogin() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    } else {
      return false;
    }
  }

  public getCurrentUserInfo() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
