import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input} from '@angular/core';
import { EditorServiceComponent } from '../../../shared/editor/editorService.component';
import {QuestionComment} from '../../../shared/model/question/question-comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() comment: QuestionComment;

  // 用于显示评论的内容 Id
  SHORT_COMMENT_CONTENT_ID = '';

  // 用于展示详细评论内容的 Id
  DETAIL_COMMENT_CONTENT_ID = '';

  // 展示评论的评论的页面
  @ViewChild('commentCommentsList')
  commentCommentsDiv: ElementRef;

  // 统计对评论的评论的数量统计
  commentsCountName = '2条评论';

  ngAfterViewInit(): void {
    this.init();
    this.commentCommentsDiv.nativeElement.style.display = 'none';
  }

  constructor(private editorServiceComponent: EditorServiceComponent) { }

  ngOnInit() {
     this.SHORT_COMMENT_CONTENT_ID = this.comment.comment.commentParent.id + '';
     this.DETAIL_COMMENT_CONTENT_ID = this.comment.comment.commentParent.id + 'detail';
     this.commentsCountName = this.comment.comment.commentInCommentCount + '条评论';
  }

  init(){
    var len = 100;      //默认显示字数
    var ctn = document.getElementById(this.SHORT_COMMENT_CONTENT_ID);  //获取div对象
    var content = ctn.innerHTML;                   //获取div里的内容

    //alert(content);
    var span = document.createElement("span");     //创建<span>元素
    var a = document.createElement("a");           //创建<a>元素
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

  /**
   * 打开对评论的评论页面
   */
  openCommentComments() {
    let divState = this.commentCommentsDiv.nativeElement.style.display;
    if (divState === 'block') {
      this.commentCommentsDiv.nativeElement.style.display = 'none';
    } else if (divState === 'none') {
      this.commentCommentsDiv.nativeElement.style.display = 'block';
    }
    this.commentsCountName = '收起评论列表';
  }

  // 和主页一样，仅对打开的 comment 应用加载 editor 的内容，其他 comment 仅仅显示缩略图
}
