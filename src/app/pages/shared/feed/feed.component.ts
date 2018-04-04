import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {EditorServiceComponent} from '../../../shared/editor/editorService.component';
import {Router} from '@angular/router';

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
  @Input() content1: string;

  private idtest: number = 1;

  // 单个评论中需不需要添加 a 标签
  aState = false;
  aText = '>>展开';

  // 用于表示全部内容是否被加载
  contentState = false;

  ngOnInit(): void {
    const contentLength = 250;
    const hiddenContent = this.testText.substr(0, contentLength);
    if (this.testText.length > contentLength) {
      this.testText = hiddenContent;
      this.aState = true;
    }
  }

  ngAfterViewInit(): void {
    // outputs `I am span`
  }

  constructor(private editorServiceComponent: EditorServiceComponent,
              private elementRef: ElementRef,
              private router: Router) {

  }

  /**
   * 打开拓展面板的事件
   */
  openExpansionPanel() {
    // 隐藏问题的简述内容
    let cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'none';
    // 显示问题的全部内容
    this.editorServiceComponent.appendHtmlContentToContainer(this.content1, 'hello');
  }

  /**
   * 关闭拓展面板
   */
  closeExpansionPanel() {
    let cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'block';
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

  testText = ' The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes\n' +
    '                very well with mountainous terrain, the Shiba Inu was originally bred for hunting. The Shiba Inu is the smallest\n' +
    '                of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous\n' +
    '                terrain, the Shiba Inu was originally bred for hunting. The Shiba Inu is the smallest of the six original and distinct\n' +
    '                spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu\n' +
    '                was originally bred for hunting.';

  openContent() {
    // 隐藏问题的简述内容
    let cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'none';
    // 显示问题的全部内容
    this.editorServiceComponent.appendHtmlContentToContainer(this.content1, 'hello');
    // 显示收起按钮
    this.contentState = true;
  }

  closeContent() {
    // 显示精简内容
    const cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'block';
    // 隐藏全部内容
    const cardContent1 = document.getElementById(this.content1);
    cardContent1.style.display = 'none';
    // 隐藏显示按钮
    this.contentState = false;
  }

  /**
   * 打开 question 页面
   */
  openQuestionDetailPage() {
    this.router.navigate(['pages/question']);
  }

}
