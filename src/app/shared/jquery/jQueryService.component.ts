import {Injectable} from '@angular/core';

/**
 * 引入第三方 jQuery 变量的声明
 */
declare var $: any;

/**
 *  该 service 主要用于操纵 jQuery
 *  主要功能如下：
 *  1. 在给定 id 的 div 下, 添加可以将 markdown 解析成 html 的容器（多个）
 *  2. 在给定 dom 的 div 下，显示进行编辑 editor 的容器 （一个）
 *  主要类型：
 *  1. display editor 类型，用于表示将 markdown 解析成 html 的页面
 *  2. edit editor 类型，用于标识输入 markdown 的输入页面
 */
 
@Injectable()
export class JqueryServiceComponent {

  getJqueryObject() {
    return $;
  }

}
