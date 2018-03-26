import {AfterViewInit, ElementRef, Injectable, ViewChild} from '@angular/core';


@Injectable()
export class ProgressBarServiceComponent {
  /**
   * 打开进度条
   */
  public openProgressBar() {
    const progressBar = document.getElementById('pagesProgressBar');
    progressBar.style.visibility = 'visible';
  }

  /**
   * 关闭进度条
   */
  public closeProgressBar() {
    const progressBar = document.getElementById('pagesProgressBar');
    progressBar.style.visibility = 'hidden';
  }
}
