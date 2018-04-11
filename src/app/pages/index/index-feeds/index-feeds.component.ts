import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {IndexServiceComponent} from '../shared/IndexServiceComponent';
import {IndexData} from '../../../shared/model/index-data.model';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {logger} from 'codelyzer/util/logger';


@Component({
  selector: 'app-pages-index-feeds',
  templateUrl: './index-feeds.component.html',
  styleUrls: ['./index-feeds.component.css'],
})

export class IndexFeedsComponent implements OnInit {
  // feeds 流数据
  indexDatas: IndexData[];

  offset = 0;

  // 判断是否滚动到底部
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.offset = this.offset + 10;
      this.indexServiceComponent
        .getIndexQuestion(this.offset + '')
        .subscribe( data => { this.indexDatas = this.indexDatas.concat(data); });
    }
  }

  constructor(private indexServiceComponent: IndexServiceComponent,
              private progressBarService: ProgressBarServiceComponent) {
  }

  ngOnInit(): void {
    // 获取主页 question 数据
    this.getQuestion();
  }

  private getQuestion() {
    this.progressBarService.openProgressBar();
    this.indexServiceComponent
      .getIndexQuestion(this.offset + '')
      .subscribe( data => {this.indexDatas = data; this.progressBarService.closeProgressBar(); });
  }

}


