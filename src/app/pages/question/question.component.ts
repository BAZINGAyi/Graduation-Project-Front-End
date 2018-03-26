import {Component, OnInit} from '@angular/core';
import {JqueryServiceComponent} from '../../shared/jquery/jQueryService.component';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  // 用于添加 editor 的 id
  questionAnswerEditorId = 'questionAnswerEditorId';
  // editor state
  EDITOR_STATE:boolean = false;

  questionHeaderId =  'questionHeaderId';

  constructor(private jQueryService: JqueryServiceComponent,
              private  editorService: EditorServiceComponent) {
  }

  ngOnInit() {
    this.init();
  }

  /**
   * 显示完整的题目内容
   */
  showAllText() {
    this.jQueryService.toggleCssClass('#test123','test');
  }

  /**
   * 打开输入回答的编辑框
   */
  openEidtor() {
    this.editorService.appendEditorToContainer(this.questionAnswerEditorId);
    this.fixFloatEditorDivPosition();
    // 显示操作编辑框的 button div 隐藏正常 button
    this.EDITOR_STATE = true;
  }

  /**
   * 隐藏编辑框
   */
  closeEditor() {
    this.editorService.hiddenEditEditor(this.questionAnswerEditorId);
    this.EDITOR_STATE = false;
  }

  /**
   * 设置 instruction div 滑动位置
   */
  fixFloatEditorDivPosition() {
    let $ = this.jQueryService.getJqueryObject();

    $.fn.fixedDiv = function(actCls){
      var that = $(this),
        offsetTop = that.offset().top,
        scrollTop;
      // 用于记录正常滚动状态时，距离视窗左侧的高度
      var normalLeftWidth = '';
      function fix(){
        scrollTop = $(document).scrollTop();
        // 滑动的距离大于到视窗顶部的高度 - 减去导航栏的高度
        if (scrollTop > offsetTop - (3.5 * 16) ) {
          that.addClass(actCls);
        } else {
          that.removeClass(actCls);
        }
      }
      fix();
      $(window).scroll(fix);
    }

    $('#' + this.questionAnswerEditorId).fixedDiv('fix-editor-div');
  }

  /**
   *  控制头部文字的隐藏
   */
  init(){
    var len = 100;      //默认显示字数
    var ctn = document.getElementById("normal-padding-column");  //获取div对象
    var content = ctn.innerHTML;                   //获取div里的内容

    //alert(content);
    var span = document.createElement("span");     //创建<span>元素
    var a = document.createElement("a");           //创建<a>元素
    // a.style.color = "#FF5252";
    span.innerHTML = content.substring(0,len);     //span里的内容为content的前len个字符

    a.innerHTML = content.length>len?"... 展开":"";  ////判断显示的字数是否大于默认显示的字数    来设置a的显示
    a.href = "javascript:void(0)";//让a链接点击不跳转

    a.onclick = function(){
      if(a.innerHTML.indexOf("展开")>0){      //如果a中含有"展开"则显示"收起"
        a.innerHTML = "<<&nbsp;收起";
        span.innerHTML = content;
      }else{
        a.innerHTML = "... 展开";
        span.innerHTML = content.substring(0,len);
      }
    }
    // 设置div内容为空，span元素 a元素加入到div中
    ctn.innerHTML = "";
    ctn.appendChild(span);
    ctn.appendChild(a);
  }
}
