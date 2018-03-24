import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-pages-index-feeds',
  templateUrl: './index-feeds.component.html',
  styleUrls: ['./index-feeds.component.css'],
})

export class IndexFeedsComponent implements OnInit {

  feeds = [1];

  ngOnInit(): void {
    this.feeds.push(2);
    this.feeds.push(3);
    this.feeds.push(4);
    this.feeds.push(5);
    this.test();
  }

  constructor() {
  }
  
  test() {
    $.fn.fixedDiv = function(actCls){
      var that = $(this),
          offsetTop = that.offset().top,
          scrollTop;
      function fix(){
          scrollTop = $(document).scrollTop();   
          if (scrollTop > offsetTop ) {
              that.addClass(actCls);
              that.css('left','819.5px');
          } else {
              that.removeClass(actCls);
          }
      }
      fix();
      $(window).scroll(fix);
  }
  
  $('#fix1').fixedDiv('fix-div');
  }
}


