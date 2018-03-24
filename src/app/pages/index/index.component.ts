import {Component, OnInit} from '@angular/core';
import { IndexServiceComponent } from './shared/IndexServiceComponent';

declare var $: any;

@Component({
  selector: 'app-pages-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  constructor(private indexServiceComponent: IndexServiceComponent) {
  }

  ngOnInit() {
      // 调整浮动部分视窗位置
    this.indexServiceComponent.fixFloatInstructionDivPosition();
  }

}
