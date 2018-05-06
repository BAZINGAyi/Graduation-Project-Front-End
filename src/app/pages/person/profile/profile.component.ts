import {Component, HostListener, OnInit} from '@angular/core';
import {ProgressBarServiceComponent} from '../../../shared/progressbar/progressBarService.component';
import {IndexServiceComponent} from '../../index/shared/IndexServiceComponent';
import {IndexData} from '../../../shared/model/index-data.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // feeds 流数据
  indexDatas: IndexData[];

  public  NORMAL_FEED = 'NORMAL_FEED';

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
