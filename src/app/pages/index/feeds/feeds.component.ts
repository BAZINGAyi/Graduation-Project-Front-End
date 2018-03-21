import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EditorServiceComponent} from '../../../shared/editor/editorService.component';

declare var $: any;
declare var editormd: any;

@Component({
  selector: 'app-pages-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
})

export class FeedsComponent implements OnInit, AfterViewInit {

  @ViewChild("tref", {read: ElementRef}) tref: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // outputs `I am span`
    console.log(this.tref.nativeElement.textContent);
  }

  constructor(private editorServiceComponent: EditorServiceComponent) {
  }

  /**
   * 打开拓展面板的事件
   */
  openExpansionPanel() {
    this.editorServiceComponent.appendHtmlContentToContainer(this.tref, 'hello');
  }

  /**
   * 关闭拓展面板
   */
  closeExpansionPanel() {
  }
}




