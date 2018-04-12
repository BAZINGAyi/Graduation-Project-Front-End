export class AppSettings {
  private static API_URL = 'http://localhost:4200/api/';
  private static API_GET_QUESTIONS = AppSettings.API_URL + 'getquestions?offset=';
  private static API_GET_TOPICLIST = AppSettings.API_URL + 'getTopicList?offset=';

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
}
