import { Injectable } from '@angular/core';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';

@Injectable()
export class FeedUtilService {

  constructor(public editorService: EditorServiceComponent) { }

  /**
   * 根据传入的 ID 生成对应的 Feed 内容
   * @param {string} toDivid
   * @param {string} setContentHtml
   */
  generateFeedContent(toDivId: string, setContentHtml: string, setInitTextLength: number) {

    // 定义一个临时节点，来提取传入 html 数据中的纯文本
    const tempDom = document.createElement('div');
    tempDom.innerHTML = setContentHtml;
    const pureText = tempDom.innerText;

    // 定义一个 span 标签用于显示数据的摘要内容
    const span = document.createElement('div');
    span.setAttribute('id', 'span' + toDivId);
    // 判断显示的字数是否大于默认显示的字数    来设置a的显示
    span.innerHTML = pureText.substring(0, setInitTextLength);

    // 定义一个 a 标签用于展开数据
    const a = document.createElement('a');
    // a.style.color = "#FF5252";
    a.innerHTML = pureText.length > setInitTextLength ? '... 展开' : '';
    // 让a链接点击不跳转
    a.href = 'javascript:void(0)';

    // 点击 a 标签后的事件，用于显示全部数据
    a.onclick = function(){
      // 如果a中含有"展开"则显示"收起"
      if (a.innerHTML.indexOf('展开') > 0 ) {
        a.innerHTML = '';
        // 使用 editor 加载数据
        this.editorService.generateQuestionDisplayEditor('span' + toDivId, setContentHtml, '');
        // span.innerHTML = setContentHtml;
      } else {
        a.innerHTML = '... 展开';
        span.innerHTML = pureText.substring(0, setInitTextLength);
      }
    }.bind(this);

    // 添加相应内容到目标 div
    const ctn = document.getElementById(toDivId);
    // 设置div内容为空，span元素 a元素加入到div中
    ctn.innerHTML = '';
    ctn.appendChild(span);
    ctn.appendChild(a);
  }

}
