import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found-data',
  templateUrl: './not-found-data.component.html',
  styleUrls: ['./not-found-data.component.css']
})
export class NotFoundDataComponent implements OnInit {

  // 用于展示数据为空时的各种情况
  @Input() displayData: string;

  constructor() { }

  ngOnInit() {
  }

}
