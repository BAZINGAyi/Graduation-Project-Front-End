import {Injectable} from '@angular/core';

/**
 * 引入第三方 jQuery 和 Editor 变量的声明
 */
declare var $: any;
declare var editormd: any;

/**
 *  该 service 主要用于操纵 Editor
 *  主要功能如下：
 *  1. 在给定 id 的 div 下, 添加可以将 markdown 解析成 html 的容器（多个）
 *  2. 在给定 dom 的 div 下，显示进行编辑 editor 的容器 （一个）
 *  主要类型：
 *  1. display editor 类型，用于表示将 markdown 解析成 html 的页面
 *  2. edit editor 类型，用于标识输入 markdown 的输入页面
 */

@Injectable()
export class EditorServiceComponent {

  // 用于在页面中作为编辑页面的 editor
  private editEditorId = 'editEditorId';
  // 用于在页面中作为显示页面你的 editor
  private displayEditorId = 'displayEditorId';
  // 用于编辑 div 中 的 editor 模板
  private editEditoTemplate = '<div id="editEditorId">' +
                                  '<textarea style="display:none;" name="">###Hello</textarea>' +
                              '</div>';

  /**
   * 根据提高 dom id，在其中添加 editor 显示页面
   * @param {string} refElement
   * @param {string} htmlContent
   */
  public appendHtmlContentToContainer(containerId: string, feedContent: string, feedTitle: string) {
    // 输入不正确，不允许添加
    if (containerId == null || containerId === '') {
      return;
    }
    const container = document.getElementById(containerId);
    container.style.padding = "2rem";
    const containerInnerText = container.innerText;
    // 证明该页面已经加载过 display editor，不重新进行加载
    if (containerInnerText != null && containerInnerText != '') {
      const cardContent = document.getElementById(containerId);
      cardContent.style.display = 'block';
      return;
    }
    // 添加 display editor
    // 要想生成一个 editor 解析的页面需要进行两个步骤
    // 1. 在想要添加的 dom 节点内生成 editor 的容器
    // 2. 在生成 editor 的容器内进行初始化 editor 的操作
    // 这里的需求是在一个单页程序中可以存在多个用于展示的 editor 的内容，所以需要传入 id 进行区分
    // container.innerHTML = this.generateDisplayEditorTemplate(containerId);
    // this.generateDisplayEditor(this.displayEditorId + containerId);

    const detailHeader = document.createElement('div');
    detailHeader.innerHTML = feedTitle;
    detailHeader.style.fontSize = '1.5rem';
    detailHeader.style.margin = '1rem';
    const  detailContent = document.createElement('div');
    detailContent.innerHTML = feedContent;
    container.appendChild(detailHeader);
    container.appendChild(detailContent);
    // 这里可以在数据库定义两个属性，一个是以 markdown 形式保持的内容用于用户更改时使用，一个是以 html 保存的内容用于前台显示时使用
  }

  /**
   * 添加输入界面到相应的 div 中
   * @param {string} containerId
   */
  public appendEditorToContainer(divId: string) {
    if (divId != null && divId !== '') {
      // 添加内容到 div 中
      const editor = $('#' + divId);
      const containerInnerText = editor.text().trim();
      if (containerInnerText != null && containerInnerText !== '') {
        this.showEditEditor(divId);
        return;
      }
      editor.innerHTML = this.editEditoTemplate;
      this.genernateEditEditor(divId);
    }
  }

  /**
   * 生成显示 display Editor 内容的页面
   */
  public generateDisplayEditor(displayEditorId: string, feedContent: string, feedTitle: string) {

    // 获取显示详细内容的 div ID
    const editor = $('#' + displayEditorId);
    // 生成显示标题的节点
    const titile = $('<h1>' + feedTitle + '</h1>');
    titile.css('font-size', 'larger');
    const containerInnerText = editor.text().trim();
    // 判断是否已经打开过了
    if (containerInnerText != null && containerInnerText !== '') {
      this.showEditEditor(displayEditorId);
      return;
    }
    // 添加标题
    editor.append(titile);
    // 生成详细内容
    editormd.markdownToHTML(displayEditorId, {
      markdown        : feedContent ,
      tocm            : true,    // Using [TOCM]
      emoji           : true,
      taskList        : true,
      tex             : true,  // 默认不解析
      flowChart       : true,  // 默认不解析
      sequenceDiagram : true,  // 默认不解析
    });
  }

  /**
   * 生成编辑 Editor 内容的页面
   * 编辑后保存的内容尽量是 html 形式，如果是 markdown 形式，则会造成多次渲染 editor
   */
  private genernateEditEditor(editEditorId: string) {
    let editor = editormd(editEditorId, {
      width   : "100%",
      height  : 540,
      syncScrolling : "single",
      path    : "../../../../assets/editor/lib/",
      saveHTMLToTextarea : true,
      toolbarIcons : function() {
          return ["undo", "redo", "|", "bold", "hr", "|", "preview",
           "watch", "|", "fullscreen", "image",'code','code-block','clear',
           'search','list-ol','reference-link'];
      },
      imageUpload : true,
      imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL : "api/testMarkdown",
      crossDomainUpload : true,
      uploadCallbackURL : "api/Idontknowthiseffectofproperty",
      onfullscreen : function() {
        const element = document.getElementById('navigationView');
        element.style.zIndex = '0';
      },

      onfullscreenExit : function() {
        const element = document.getElementById('navigationView');
        element.style.zIndex = '200';
      }
    });
  }

  /**
   * 生成用于显示 display editor 的 div 容器
   * @param displayEditorId 用于在显示 editor 的 div 的 id
   */
  private generateDisplayEditorTemplate(displayEditorId:string) {

    if (displayEditorId == null || displayEditorId == '') {
      return null;
    }

    let displayEditorTemplate = '<div id="displayEditorId' + displayEditorId + '">' +
                                    '<textarea style="display:none;" name="">###Hello</textarea>' +
                                '</div>';
    return displayEditorTemplate;
  }

  /**
   * 根据 div id 隐藏内容
   * @type {string}
   */
  hiddenEditEditor(divId: string) {
    if (divId != null && divId != '') {
      const editor = $('#' + divId);
      editor.hide();
    }
  }

  /**
   * 根据 div id 显示内容
   * @type {string}
   */
  showEditEditor(divId: string) {
    if (divId != null && divId != '') {
      const editor = $('#' + divId);
      editor.show();
    }
  }

  private text = 'let markdown = \'# Editor.md\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'**目录 (Table of Contents)**\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[TOCM]\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[TOC]\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'# Heading 1\\n\' +\n' +
    '      \'## Heading 2               \\n\' +\n' +
    '      \'### Heading 3\\n\' +\n' +
    '      \'#### Heading 4\\n\' +\n' +
    '      \'##### Heading 5\\n\' +\n' +
    '      \'###### Heading 6\\n\' +\n' +
    '      \'# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")\\n\' +\n' +
    '      \'## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")\\n\' +\n' +
    '      \'### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")\\n\' +\n' +
    '      \'#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")\\n\' +\n' +
    '      \'##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")\\n\' +\n' +
    '      \'###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### 标题（用底线的形式）Heading (underline)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'This is an H1\\n\' +\n' +
    '      \'=============\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'This is an H2\\n\' +\n' +
    '      \'-------------\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### 字符效果和横线等\\n\' +\n' +
    '      \'                \\n\' +\n' +
    '      \'----\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'~~删除线~~ <s>删除线（开启识别HTML标签时）</s>\\n\' +\n' +
    '      \'*斜体字*      _斜体字_\\n\' +\n' +
    '      \'**粗体**  __粗体__\\n\' +\n' +
    '      \'***粗斜体*** ___粗斜体___\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'上标：X<sub>2</sub>，下标：O<sup>2</sup>\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'**缩写(同HTML的abbr标签)**\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### 引用 Blockquotes\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> 引用文本 Blockquotes\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'引用的行内混合 Blockquotes\\n\' +\n' +
    '      \'                    \\n\' +\n' +
    '      \'> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](http://localhost/)。\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### 锚点与链接 Links\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[普通链接](http://localhost/)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[普通链接带标题](http://localhost/ "普通链接带标题")\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'直接链接：<https://github.com>\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[锚点链接][anchor-id] \\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[anchor-id]: http://www.this-anchor-link.com/\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[mailto:test.test@gmail.com](mailto:test.test@gmail.com)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'GFM a-tail link @pandao  邮箱地址自动链接 test.test@gmail.com  www@vip.qq.com\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> @pandao\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### 多语言代码高亮 Codes\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### 行内代码 Inline code\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'执行命令：`npm install marked`\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### 缩进风格\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'即缩进四个空格，也做为实现类似 `<pre>` 预格式化文本 ( Preformatted Text ) 的功能。\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'    <?php\\n\' +\n' +
    '      \'        echo "Hello world!";\\n\' +\n' +
    '      \'    ?>\\n\' +\n' +
    '      \'    \\n\' +\n' +
    '      \'预格式化文本：\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'    | First Header  | Second Header |\\n\' +\n' +
    '      \'    | ------------- | ------------- |\\n\' +\n' +
    '      \'    | Content Cell  | Content Cell  |\\n\' +\n' +
    '      \'    | Content Cell  | Content Cell  |\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### JS代码　\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'```javascript\\n\' +\n' +
    '      \'function test() {\\n\' +\n' +
    '      \'\\tconsole.log("Hello world!");\\n\' +\n' +
    '      \'}\\n\' +\n' +
    '      \' \\n\' +\n' +
    '      \'(function(){\\n\' +\n' +
    '      \'    var box = function() {\\n\' +\n' +
    '      \'        return box.fn.init();\\n\' +\n' +
    '      \'    };\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'    box.prototype = box.fn = {\\n\' +\n' +
    '      \'        init : function(){\\n\' +\n' +
    '      \'            console.log(\\\'box.init()\\\');\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'\\t\\t\\treturn this;\\n\' +\n' +
    '      \'        },\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'\\t\\tadd : function(str) {\\n\' +\n' +
    '      \'\\t\\t\\talert("add", str);\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'\\t\\t\\treturn this;\\n\' +\n' +
    '      \'\\t\\t},\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'\\t\\tremove : function(str) {\\n\' +\n' +
    '      \'\\t\\t\\talert("remove", str);\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'\\t\\t\\treturn this;\\n\' +\n' +
    '      \'\\t\\t}\\n\' +\n' +
    '      \'    };\\n\' +\n' +
    '      \'    \\n\' +\n' +
    '      \'    box.fn.init.prototype = box.fn;\\n\' +\n' +
    '      \'    \\n\' +\n' +
    '      \'    window.box =box;\\n\' +\n' +
    '      \'})();\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'var testBox = box();\\n\' +\n' +
    '      \'testBox.add("jQuery").remove("jQuery");\\n\' +\n' +
    '      \'```\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### HTML 代码 HTML codes\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'```html\\n\' +\n' +
    '      \'<!DOCTYPE html>\\n\' +\n' +
    '      \'<html>\\n\' +\n' +
    '      \'    <head>\\n\' +\n' +
    '      \'        <mate charest="utf-8" />\\n\' +\n' +
    '      \'        <meta name="keywords" content="Editor.md, Markdown, Editor" />\\n\' +\n' +
    '      \'        <title>Hello world!</title>\\n\' +\n' +
    '      \'        <style type="text/css">\\n\' +\n' +
    '      \'            body{font-size:14px;color:#444;font-family: "Microsoft Yahei", Tahoma, "Hiragino Sans GB", Arial;background:#fff;}\\n\' +\n' +
    '      \'            ul{list-style: none;}\\n\' +\n' +
    '      \'            img{border:none;vertical-align: middle;}\\n\' +\n' +
    '      \'        </style>\\n\' +\n' +
    '      \'    </head>\\n\' +\n' +
    '      \'    <body>\\n\' +\n' +
    '      \'        <h1 class="text-xxl">Hello world!</h1>\\n\' +\n' +
    '      \'        <p class="text-green">Plain text</p>\\n\' +\n' +
    '      \'    </body>\\n\' +\n' +
    '      \'</html>\\n\' +\n' +
    '      \'```\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### 图片 Images\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'Image:\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'![](https://pandao.github.io/editor.md/examples/images/4.jpg)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> Follow your heart.\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'![](https://pandao.github.io/editor.md/examples/images/8.jpg)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> 图为：厦门白城沙滩\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'图片加链接 (Image + Link)：\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[![](https://pandao.github.io/editor.md/examples/images/7.jpg)](https://pandao.github.io/editor.md/images/7.jpg "李健首张专辑《似水流年》封面")\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> 图为：李健首张专辑《似水流年》封面\\n\' +\n' +
    '      \'                \\n\' +\n' +
    '      \'----\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### 列表 Lists\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### 无序列表（减号）Unordered Lists (-)\\n\' +\n' +
    '      \'                \\n\' +\n' +
    '      \'- 列表一\\n\' +\n' +
    '      \'- 列表二\\n\' +\n' +
    '      \'- 列表三\\n\' +\n' +
    '      \'     \\n\' +\n' +
    '      \'#### 无序列表（星号）Unordered Lists (*)\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'* 列表一\\n\' +\n' +
    '      \'* 列表二\\n\' +\n' +
    '      \'* 列表三\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### 无序列表（加号和嵌套）Unordered Lists (+)\\n\' +\n' +
    '      \'                \\n\' +\n' +
    '      \'+ 列表一\\n\' +\n' +
    '      \'+ 列表二\\n\' +\n' +
    '      \'    + 列表二-1\\n\' +\n' +
    '      \'    + 列表二-2\\n\' +\n' +
    '      \'    + 列表二-3\\n\' +\n' +
    '      \'+ 列表三\\n\' +\n' +
    '      \'    * 列表一\\n\' +\n' +
    '      \'    * 列表二\\n\' +\n' +
    '      \'    * 列表三\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### 有序列表 Ordered Lists (-)\\n\' +\n' +
    '      \'                \\n\' +\n' +
    '      \'1. 第一行\\n\' +\n' +
    '      \'2. 第二行\\n\' +\n' +
    '      \'3. 第三行\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### GFM task list\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'- [x] GFM task list 1\\n\' +\n' +
    '      \'- [x] GFM task list 2\\n\' +\n' +
    '      \'- [ ] GFM task list 3\\n\' +\n' +
    '      \'    - [ ] GFM task list 3-1\\n\' +\n' +
    '      \'    - [ ] GFM task list 3-2\\n\' +\n' +
    '      \'    - [ ] GFM task list 3-3\\n\' +\n' +
    '      \'- [ ] GFM task list 4\\n\' +\n' +
    '      \'    - [ ] GFM task list 4-1\\n\' +\n' +
    '      \'    - [ ] GFM task list 4-2\\n\' +\n' +
    '      \'                \\n\' +\n' +
    '      \'----\\n\' +\n' +
    '      \'                    \\n\' +\n' +
    '      \'### 绘制表格 Tables\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'| 项目        | 价格   |  数量  |\\n\' +\n' +
    '      \'| --------   | -----:  | :----:  |\\n\' +\n' +
    '      \'| 计算机      | $1600   |   5     |\\n\' +\n' +
    '      \'| 手机        |   $12   |   12   |\\n\' +\n' +
    '      \'| 管线        |    $1    |  234  |\\n\' +\n' +
    '      \'                    \\n\' +\n' +
    '      \'First Header  | Second Header\\n\' +\n' +
    '      \'------------- | -------------\\n\' +\n' +
    '      \'Content Cell  | Content Cell\\n\' +\n' +
    '      \'Content Cell  | Content Cell \\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'| First Header  | Second Header |\\n\' +\n' +
    '      \'| ------------- | ------------- |\\n\' +\n' +
    '      \'| Content Cell  | Content Cell  |\\n\' +\n' +
    '      \'| Content Cell  | Content Cell  |\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'| Function name | Description                    |\\n\' +\n' +
    '      \'| ------------- | ------------------------------ |\\n\' +\n' +
    '      \'| `help()`      | Display the help window.       |\\n\' +\n' +
    '      \'| `destroy()`   | **Destroy your computer!**     |\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'| Left-Aligned  | Center Aligned  | Right Aligned |\\n\' +\n' +
    '      \'| :------------ |:---------------:| -----:|\\n\' +\n' +
    '      \'| col 3 is      | some wordy text | $1600 |\\n\' +\n' +
    '      \'| col 2 is      | centered        |   $12 |\\n\' +\n' +
    '      \'| zebra stripes | are neat        |    $1 |\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'| Item      | Value |\\n\' +\n' +
    '      \'| --------- | -----:|\\n\' +\n' +
    '      \'| Computer  | $1600 |\\n\' +\n' +
    '      \'| Phone     |   $12 |\\n\' +\n' +
    '      \'| Pipe      |    $1 |\\n\' +\n' +
    '      \'                \\n\' +\n' +
    '      \'----\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### 特殊符号 HTML Entities Codes\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'&copy; &  &uml; &trade; &iexcl; &pound;\\n\' +\n' +
    '      \'&amp; &lt; &gt; &yen; &euro; &reg; &plusmn; &para; &sect; &brvbar; &macr; &laquo; &middot; \\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'X&sup2; Y&sup3; &frac34; &frac14;  &times;  &divide;   &raquo;\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'18&ordm;C  &quot;  &apos;\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[========]\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### Emoji表情 :smiley:\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> Blockquotes :star:\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'#### GFM task lists & Emoji & fontAwesome icon emoji & editormd logo emoji :editormd-logo-5x:\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and <del>tags</del> supported :editormd-logo:;\\n\' +\n' +
    '      \'- [x] list syntax required (any unordered or ordered list supported) :editormd-logo-3x:;\\n\' +\n' +
    '      \'- [x] [ ] :smiley: this is a complete item :smiley:;\\n\' +\n' +
    '      \'- [ ] []this is an incomplete item [test link](#) :fa-star: @pandao; \\n\' +\n' +
    '      \'- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;\\n\' +\n' +
    '      \'    - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;\\n\' +\n' +
    '      \'    - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);\\n\' +\n' +
    '      \' \\n\' +\n' +
    '      \'#### 反斜杠 Escape\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'\\\\*literal asterisks\\\\*\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[========]\\n\' +\n' +
    '      \'            \\n\' +\n' +
    '      \'### 分页符 Page break\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'> Print Test: Ctrl + P\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[========]\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### 绘制流程图 Flowchart\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'```flow\\n\' +\n' +
    '      \'st=>start: 用户登陆\\n\' +\n' +
    '      \'op=>operation: 登陆操作\\n\' +\n' +
    '      \'cond=>condition: 登陆成功 Yes or No?\\n\' +\n' +
    '      \'e=>end: 进入后台\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'st->op->cond\\n\' +\n' +
    '      \'cond(yes)->e\\n\' +\n' +
    '      \'cond(no)->op\\n\' +\n' +
    '      \'```\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'[========]\\n\' +\n' +
    '      \'                    \\n\' +\n' +
    '      \'### 绘制序列图 Sequence Diagram\\n\' +\n' +
    '      \'                    \\n\' +\n' +
    '      \'```seq\\n\' +\n' +
    '      \'Andrew->China: Says Hello \\n\' +\n' +
    '      \'Note right of China: China thinks\\\\nabout it \\n\' +\n' +
    '      \'China-->Andrew: How are you? \\n\' +\n' +
    '      \'Andrew->>China: I am good thanks!\\n\' +\n' +
    '      \'```\\n\' +\n' +
    '      \'\\n\' +\n' +
    '      \'### End\';\n';
}
