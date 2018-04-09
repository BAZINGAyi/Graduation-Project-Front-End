import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IndexServiceComponent} from '../shared/IndexServiceComponent';
import {IndexData} from '../../../shared/model/index-data.model';

@Component({
  selector: 'app-pages-index-feeds',
  templateUrl: './index-feeds.component.html',
  styleUrls: ['./index-feeds.component.css'],
})

export class IndexFeedsComponent implements OnInit {
  // feeds 流数据
  indexDatas: IndexData[];

  feeds = [1];

  constructor(private indexServiceComponent: IndexServiceComponent) {
  }

  ngOnInit(): void {
    this.feeds.push(2);
    this.feeds.push(3);
    this.feeds.push(4);
    this.feeds.push(5);
    // 获取主页 question 数据
    this.getQuestion();
  }

  private getQuestion() {
    this.indexServiceComponent
      .getIndexQuestion('0')
      .subscribe( data => {this.indexDatas = data; console.log(this.indexDatas); });
  }

}


