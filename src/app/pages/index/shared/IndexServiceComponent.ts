import {Injectable} from '@angular/core';
import { JqueryServiceComponent } from '../../../shared/jquery/jQueryService.component';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';
import {Observable} from 'rxjs/Observable';
import {IndexData} from '../../../shared/model/index-data.model';


@Injectable()
export class IndexServiceComponent {

    constructor(private jqueryServiceComponent: JqueryServiceComponent,
                private httpClient: HttpClient,
                ) {
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

  /**
   *  获取主页的问题数据
   */
  getIndexQuestion(offset: string): Observable<IndexData[]> {
    const questionUrl = AppSettings.getQuestionsUrl(offset);
    return this.httpClient.get<IndexData[]>(questionUrl);
  }

}
