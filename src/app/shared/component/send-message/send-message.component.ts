import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {IndexData} from '../../model/index-data.model';
import {AppSettings} from '../../url/AppSettings';
import {Observable} from 'rxjs/Observable';
import {User} from '../../model/user.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  myControl: FormControl = new FormControl();

  searchValue: User[];

  users = [
    'One',
    'Two',
    'Three'
  ];
  sendToUsername: '';


  constructor(public dialogRef: MatDialogRef<SendMessageComponent>,
              public httpClient: HttpClient) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getSearchResult(event) {
    const searchUrl = AppSettings.getSearchUserList(event.target.value, 0);
    this.httpClient
      .get<any>(searchUrl).subscribe( data => { this.searchValue = data.userList; } );
  }
}
