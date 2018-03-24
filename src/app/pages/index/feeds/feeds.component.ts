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

  // 简略内容显示的 div Id
  matCardContentId = 'mat-card-content-console';

  // 用于接收 index-feeds 传过来的 id，用于标识每个 feeds
  @Input() content: string;

  private idtest : number = 1;

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
    // 隐藏问题的简述内容
    let cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'none';
    // 显示问题的全部内容
    this.editorServiceComponent.appendHtmlContentToContainer(this.content, 'hello');
  }

  /**
   * 关闭拓展面板
   */
  closeExpansionPanel() {
    let cardContent = document.getElementById(this.matCardContentId);
    cardContent.style.display = 'block';
  }
}




