import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import {EditorServiceComponent} from '../../../shared/editor/editorService.component';
import { log } from 'util';


declare var $: any;
declare var editormd: any;

@Component({
  selector: 'app-pages-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
})

export class FeedsComponent implements OnInit, AfterViewInit {

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() content: string;

  // @ViewChild("tref", {read: ElementRef}) tref: ElementRef;
 private idtest : number = 1;

 // TO DO (1) 父 component 给子 component 传参？
 // TO DO (2) 利用查询到的 div，找到相应 id 的div？ 没有用 最后还是通过 id 去加容器 ok


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // outputs `I am span`

  }

  constructor(private editorServiceComponent: EditorServiceComponent,
  private elementRef: ElementRef) {
    
  }

  /**
   * 打开拓展面板的事件
   */
  openExpansionPanel() {
    this.editorServiceComponent.appendHtmlContentToContainer(this.content, 'hello');
  }

  /**
   * 关闭拓展面板
   */
  closeExpansionPanel() {
  }
}




