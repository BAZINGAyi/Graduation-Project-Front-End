import { Component, OnInit } from '@angular/core';
import {JqueryServiceComponent} from '../../jquery/jQueryService.component';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  constructor(private jqueryServiceComponent: JqueryServiceComponent) { }

  ngOnInit() {
    this.fixFloatInstructionDivPosition();
  }

  /**
   * 设置 instruction div 滑动位置
   */
  fixFloatInstructionDivPosition() {
    let $ = this.jqueryServiceComponent.getJqueryObject();

    $.fn.fixedDiv = function(actCls){
      var that = $(this),
        offsetTop = that.offset().top,
        scrollTop;
      // 用于记录正常滚动状态时，距离视窗左侧的高度
      var normalLeftWidth = '';
      function fix(){

        scrollTop = $(document).scrollTop();
        // 滑动的距离大于到视窗顶部的高度
        if (scrollTop > offsetTop ) {
          that.addClass(actCls);
          that.css('left',normalLeftWidth);
        } else {
          that.removeClass(actCls);
          normalLeftWidth = that.offset().left;
        }
      }
      fix();
      $(window).scroll(fix);
    }

    $('#fix1').fixedDiv('fix-div');
  }

}
