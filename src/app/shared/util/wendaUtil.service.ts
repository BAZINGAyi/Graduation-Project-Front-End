import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class WendaUtils {
  constructor(private http: HttpClient) { }

  public reloadPage() {
    location.reload();
  }

  /**
   * 将转义后得 HTML 解析成正常的 HTML
   * @param text
   * @returns {string & (string | null)}
   * @constructor
   */
  public HTMLDecode(text) {
    let temp = document.createElement("div");
    temp.innerHTML = text;
    const output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }

  /**
   *
   * @param content
   * @returns {any}
   */
  public extractFirstImageUrl(content) {

    // 匹配图片（g表示匹配所有结果i表示区分大小写）
    const imgReg = /<img.*?(?:>|\/>)/gi;
    // 匹配src属性
    const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

    const arr = content.match(imgReg);
    if (arr != null && arr.length !== 0) {
      const src = arr[0].match(srcReg);
      // 获取图片地址
      if (src[1]) {
        return src[1];
      }
    } else {
      return undefined;
    }
  }
}
