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

  private EDIT_EDITOR_INSTANCE;

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
    container.style.padding = '2rem';
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
    // const titile = $('<h1>' + feedTitle + '</h1>');
    // titile.css('font-size', 'larger');
    const containerInnerText = editor.text().trim();
    // 判断是否已经打开过了
    if (containerInnerText != null && containerInnerText !== '') {
      this.showEditEditor(displayEditorId);
      return;
    }
    // 添加标题
    // editor.append(titile);
    // 生成详细内容
    editormd.markdownToHTML(displayEditorId, {
      markdown        : feedContent ,
      tocm            : true,    // Using [TOCM]
      emoji           : true,
      taskList        : true,
      tex             : true,  // 默认不解析
      flowChart       : true,  // 默认不解析
      sequenceDiagram : true,  // 默认不解析
      htmlDecode : true,
    });
  }

  /**
   * 生成显示 display Editor 内容的页面
   */
  public generateQuestionDisplayEditor(displayEditorId: string, feedContent: string) {
    // 获取显示详细内容的 div ID
    const editor = $('#' + displayEditorId);
    editor.css('font-size', '1rem');
    editor.css('padding', '1rem');
    const containerInnerText = editor.text().trim();
    // 判断是否已经打开过了
    if (containerInnerText != null && containerInnerText !== '') {
      this.showEditEditor(displayEditorId);
      return;
    }
    // 生成详细内容
    editormd.markdownToHTML(displayEditorId, {
      markdown        : feedContent ,
      tocm            : true,    // Using [TOCM]
      emoji           : true,
      taskList        : true,
      tex             : true,  // 默认不解析
      flowChart       : true,  // 默认不解析
      sequenceDiagram : true,  // 默认不解析
      htmlDecode : true,
    });
  }

  /**
   * 生成编辑 Editor 内容的页面
   * 编辑后保存的内容尽量是 html 形式，如果是 markdown 形式，则会造成多次渲染 editor
   */
  private genernateEditEditor(editEditorId: string) {
    const editor = editormd(editEditorId, {
      width   : '100%',
      height  : 540,
      syncScrolling : 'single',
      path    : '../../../../assets/editor/lib/',
      htmlDecode : true,
      saveHTMLToTextarea : true,
      toolbarIcons : function() {
          return ['undo', 'redo', '|', 'bold', 'hr', '|', 'preview',
           'watch', '|', 'fullscreen', 'image', 'code', 'code-block', 'clear',
           'search', 'list-ol', 'reference-link'];
      },
      imageUpload : true,
      imageFormats : ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
      imageUploadURL : 'api/uploadQuestionImage',
      crossDomainUpload : true,
      uploadCallbackURL : 'api/Idontknowthiseffectofproperty',
      onfullscreen : function() {
        const element = document.getElementById('navigationView');
        element.style.zIndex = '0';
      },

      onfullscreenExit : function() {
        const element = document.getElementById('navigationView');
        element.style.zIndex = '200';
      }
    });
    this.EDIT_EDITOR_INSTANCE = editor;
  }

  /**
   * 生成用于显示 display editor 的 div 容器
   * @param displayEditorId 用于在显示 editor 的 div 的 id
   */
  private generateDisplayEditorTemplate(displayEditorId: string) {

    if (displayEditorId == null || displayEditorId == '') {
      return null;
    }

    const displayEditorTemplate = '<div id="displayEditorId' + displayEditorId + '">' +
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

  /**
   * 获取编辑框输入的 html
   */
  getEditEditorHtml() {
    if (this.EDIT_EDITOR_INSTANCE != null) {
      return this.EDIT_EDITOR_INSTANCE.getHTML();
    }
  }

  /**
   * 获取编辑框输入的 html
   */
  getEditEditorMarkdown() {
    if (this.EDIT_EDITOR_INSTANCE != null) {
      return this.EDIT_EDITOR_INSTANCE.getMarkdown();
    }
  }

}
