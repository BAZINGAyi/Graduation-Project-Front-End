import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {EditorServiceComponent} from '../../../shared/editor/editorService.component';
import {Router} from '@angular/router';
import {IndexData} from '../../../shared/model/index-data.model';


declare var $: any;
declare var editormd: any;

@Component({
  selector: 'app-pages-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewInit {

  // 简略内容显示的 div Id
  matCardContentId = 'mat-card-content-console';

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() feed: IndexData;

  // 单个评论中需不需要添加 a 标签
  aState = false;
  aText = '>>展开';

  // 用于表示全部内容是否被加载
  contentState = false;

  // 每个 feed 流中的问题内容
  feedContent = '';

  // 每个 feed 流中的标题内容
  feedTitle = '';

  constructor(private editorServiceComponent: EditorServiceComponent,
              private elementRef: ElementRef,
              private router: Router) {

  }

  ngOnInit(): void {
    this.generateFeedContent();
    this.generateFeedTitle();
  }

  ngAfterViewInit(): void {
    // outputs `I am span`
  }

  /**
   * 生成每个 feed 流的内容
   */
  generateFeedContent() {
    // 定义显示的字符数
    const contentLength = 150;
    // 获取要显示的问题内容
    const questionContent = this.feed.question.content.trim();
    // 创建节点用于装载 question 的内容
    const contentDom = document.createElement('div');
    contentDom.innerHTML = questionContent;
    // 从创建的节点中取出 text 文本的前 n 个汉字，作为现实内容的缩略版
    const contentText = contentDom.innerText.trim();
    // 判断是否将内容隐藏
    if (contentText.length > contentLength) {
      this.feedContent = contentText.substr(0, contentLength);
      this.aState = true;
    } else {
      this.feedContent = contentText;
      this.aState = false;
    }

    // 是否存在图片，存在图片的话生成图片
    // const imageUrl = questionContent.indexOf('<img ="', 0);
    // const regex = new RegExp('<img[\\s]+src[\\s]*=[\\s]*(([\'"](?<src>[^\'"]*)[\\\'"])|(?<src>[^\\s]*))');
    // console.log(regex.exec(questionContent));

  }

  /**
   * 生成每个 feed 的标题
   */
  generateFeedTitle() {
    const feedTitle = this.feed.question.title.trim();
    this.feedTitle = feedTitle;
  }

  /**
   * 点击展开按钮，查看问题详细内容
   */
  openContent() {
    // 隐藏问题的简述内容
    const cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'none';
    // 显示问题的全部内容
    this.editorServiceComponent.appendHtmlContentToContainer(this.feed.user.id + '',
      this.feed.question.content.trim(),
      this.feed.question.title.trim()
    );
    // 显示收起按钮
    this.contentState = true;
  }

  /**
   * 点击关闭按钮，关闭问题详细内容
   */
  closeContent() {
    // 显示精简内容
    const cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'block';
    // 隐藏全部内容
    const detailContent = document.getElementById(this.feed.user.id + '');
    detailContent.style.display = 'none';
    // 隐藏显示按钮
    this.contentState = false;
  }

  /**
   * 打开 question 页面
   */
  openQuestionDetailPage() {
    this.router.navigate(['pages/question']);
  }

  // /**
  //  *  控制头部文字的隐藏
  //  */
  // init() {
  //   var len = 100;      //默认显示字数
  //   var ctn = document.getElementById('normal-padding-column');  //获取div对象
  //   var content = ctn.innerHTML;                   //获取div里的内容
  //
  //   //alert(content);
  //   var span = document.createElement('span');     //创建<span>元素
  //   var a = document.createElement('a');           //创建<a>元素
  //   // a.style.color = "#FF5252";
  //   span.innerHTML = content.substring(0, len);     //span里的内容为content的前len个字符
  //
  //   a.innerHTML = content.length > len ? '... 展开' : '';  ////判断显示的字数是否大于默认显示的字数    来设置a的显示
  //   a.href = 'javascript:void(0)';//让a链接点击不跳转
  //
  //   a.onclick = function () {
  //     if (a.innerHTML.indexOf('展开') > 0) {      //如果a中含有"展开"则显示"收起"
  //       a.innerHTML = '<<&nbsp;收起';
  //       span.innerHTML = content;
  //     } else {
  //       a.innerHTML = '... 展开';
  //       span.innerHTML = content.substring(0, len);
  //     }
  //   };
  //   // 设置div内容为空，span元素 a元素加入到div中
  //   ctn.innerHTML = '';
  //   ctn.appendChild(span);
  //   ctn.appendChild(a);
  // }

}
