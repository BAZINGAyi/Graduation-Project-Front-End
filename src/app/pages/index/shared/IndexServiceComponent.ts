import {Injectable} from '@angular/core';
import { JqueryServiceComponent } from '../../../shared/jquery/jQueryService.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppSettings} from '../../../shared/url/AppSettings';
import {Observable} from 'rxjs/Observable';
import {IndexData} from '../../../shared/model/index-data.model';
import {AuthenticationService} from '../../../authentication/authentication.service';


@Injectable()
export class IndexServiceComponent {

    constructor(private jqueryServiceComponent: JqueryServiceComponent,
                private authenticationService: AuthenticationService,
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
            function fix() {

                scrollTop = $(document).scrollTop();
                // 滑动的距离大于到视窗顶部的高度
                if (scrollTop > offsetTop ) {
                    that.addClass(actCls);
                    that.css('left', normalLeftWidth);
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

  getLoginUserQuestionList(offset: string, userId: number): Observable<any> {
    const questionUrl = AppSettings.getLoginUserQuestionList(offset, userId);
    return this.httpClient.get<any>(questionUrl, this.authenticationService.getHttpHeader());
  }

  getMyCommentQuestionList(offset: string): Observable<IndexData[]> {
    const questionUrl = AppSettings.getMyCommentQuestionList(offset);
    return this.httpClient.get<IndexData[]>(questionUrl, this.authenticationService.getHttpHeader());
  }

  // 文档高度
   getDocumentTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }

// 可视窗口高度
   getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

// 滚动条滚动高度
   getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  }

}
