export class AppSettings {
  private static API_URL = 'http://localhost:4200/api/';
  private static API_GET_QUESTIONS = AppSettings.API_URL + 'getquestions?offset=';
  private static API_GET_TOPICLIST = AppSettings.API_URL + 'getTopicList?offset=';
  private static API_GET_QUESTION_DETAIL = AppSettings.API_URL + 'question?qid=';
  private static API_GET_QUESTION_TOPIC_LIST = AppSettings.API_URL + 'getTopicQuestion?tId=';
  private static API_GET_QUESTION_SEARCH_LIST = AppSettings.API_URL + 'getSearchQuestionList?searchContent=';
  private static API_GET_TIMELINE_FEEDS = AppSettings.API_URL + 'pullUserFeeds';
  private static API_GET_MY_COMMENT_QUESTION_LIST = AppSettings.API_URL + 'queryUserCommentQuestionList?offset=';
  private static API_GET_LOGIN = AppSettings.API_URL + 'login/';
  private static API_GET_REGISTER = AppSettings.API_URL + 'reg/';
  private static API_SUBMMIT_QUESTION = AppSettings.API_URL + 'question/add';

  /**
   * @param {string} offset 查询数据库相对与问题的偏移量
   * @returns {string} 拼接完成后的 URL
   */
  public static getQuestionsUrl (offset: string) {
    if (offset != null && offset !== '') {
      return this.API_GET_QUESTIONS + offset;
    } else {
      return this.API_GET_QUESTIONS + '0';
    }
  }

  /**
   * @param {string} offset 查询数据库相对与问题的偏移量
   * @returns {string} 拼接完成后的 URL
   */
  public static getTopicListUrl (offset: string) {
    if (offset != null && offset !== '') {
      return this.API_GET_TOPICLIST + offset;
    } else {
      return this.API_GET_TOPICLIST + '0';
    }
  }

  static getQuestionDetail(qid: number) {
    return this.API_GET_QUESTION_DETAIL + qid;
  }

  static getTopicQuestionList(tid: number, offset: number) {
    return this.API_GET_QUESTION_TOPIC_LIST + tid + '&&offset=' + offset;
  }

  static getSearchQuestionList(searchContent: string, offset: number) {
    return this.API_GET_QUESTION_SEARCH_LIST + searchContent +  '&&offset=' + offset;
  }

  static getTimeLineFeeds() {
    return this.API_GET_TIMELINE_FEEDS;
  }

  static getMyCommentQuestionList(offset: string) {
    return this.API_GET_MY_COMMENT_QUESTION_LIST + offset;
  }

  static getLoginUrl() {
    return this.API_GET_LOGIN;
  }

  static getRegister() {
    return this.API_GET_REGISTER;
  }

  static getSubmitQuestionUrl() {
    return this.API_SUBMMIT_QUESTION;
  }

}
