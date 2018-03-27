import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
  ];


  constructor(public dialogRef: MatDialogRef<SendMessageComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
