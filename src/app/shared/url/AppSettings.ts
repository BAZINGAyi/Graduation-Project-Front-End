export class AppSettings {

  private static API_URL = 'http://localhost:4200/api/';
  private static API_GET_QUESTIONS = AppSettings.API_URL + 'getquestions?offset=';
  private static API_GET_TOPIC_LIST = AppSettings.API_URL + 'getTopicList?offset=';
  private static API_GET_QUESTION_DETAIL = AppSettings.API_URL + 'question?qid=';
  private static API_GET_QUESTION_TOPIC_LIST = AppSettings.API_URL + 'getTopicQuestion?tId=';
  private static API_GET_QUESTION_SEARCH_LIST = AppSettings.API_URL + 'getSearchQuestionList?searchContent=';
  private static API_GET_USER_SEARCH_LIST = AppSettings.API_URL + 'getSearchUserList?username=';
  private static API_GET_TIMELINE_FEEDS = AppSettings.API_URL + 'pullUserFeeds';
  private static API_GET_MY_COMMENT_QUESTION_LIST = AppSettings.API_URL + 'queryUserCommentQuestionList?offset=';
  private static API_SUBMMIT_QUESTION = AppSettings.API_URL + 'question/add';
  private static API_PUT_QUESTION_UPDATE = AppSettings.API_URL + 'question/update';
  private static API_POST_LOGIN = AppSettings.API_URL + 'login/';
  private static API_POST_REGISTER = AppSettings.API_URL + 'reg/';
  private static API_POST_FOLLOW_QUSTION = AppSettings.API_URL + 'followQuestion';
  private static API_POST_UNFOLLOW_QUESTION = AppSettings.API_URL + 'unfollowQuestion';
  private static API_POST_LIKE_COMMENT = AppSettings.API_URL + 'like';
  private static API_POST_DISLIKE_COMMENT = AppSettings.API_URL + 'dislike';
  private static API_POST_SUBMIT_COMMENT_OF_ANSWER = AppSettings.API_URL + 'addCommentOfAnswer';
  private static API_PUT_UPDATE_COMMMENT_OF_ANSWER = AppSettings.API_URL + 'updateCommentOfAnswer';
  private static API_POST_SUBMIT_COMEENT = AppSettings.API_URL + 'addQuestionComment';
  private static API_POST_GET_LOGIN_USER_PUSH_QUESTIONS = AppSettings.API_URL + '/getUserProfile?offset=';
  private static APT_DELETE_QUESTION = AppSettings.API_URL + 'question/delete';
  private static API_PUT_UPDATE_ANWSER = AppSettings.API_URL + 'updateQuestionComment';
  private static API_POST_DELETE_ANWSER = AppSettings.API_URL + 'comment/delete';
  private static API_GET_FOLLOW_QUESTIONS = AppSettings.API_URL +  'queryUserFolloweeQuestionList?offset=';
  private static API_POST_FOLLOW_USER = AppSettings.API_URL + 'followUser';
  private static API_POST_UNFOLLOW_USER = AppSettings.API_URL + 'unfollowUser';
  private static API_POST_GET_FOLLOWERS = AppSettings.API_URL + 'getUserFollowers';

  ///////////////// dialog config /////////////////////////////
  private static DIALOG_ASK_QUESTION_CONFIG = {
    width: '60%',
    height: '700px',
    panelClass: 'no-padding-dialog',
    data: {}
  };
  private static DIALOG_SEND_MESSAGE_CONFIG = {
    width: '50%',
    height: '250px',
    panelClass: 'no-padding-dialog',
  };
  private static DIALOG_LOGIN_CONFIG = {
    width: '40%',
    height: '350px',
    panelClass: 'no-padding-dialog',
  };
  private static DIALOG_REGISTER_CONFIG = {
    width: '40%',
    height: '350px',
    panelClass: 'no-padding-dialog',
  };

  ////////////////////// http code status ///////////////////////////////////
  private static SUCCESS_STATUS = 200;
  private static NO_CONTENT = 201;
  private static Unauthorized = 401;

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
      return this.API_GET_TOPIC_LIST + offset;
    } else {
      return this.API_GET_TOPIC_LIST + '0';
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

  static getSearchUserList(searchContent: string, offset: number) {
    return this.API_GET_USER_SEARCH_LIST + searchContent +  '&&offset=' + offset;
  }

  static getTimeLineFeeds() {
    return this.API_GET_TIMELINE_FEEDS;
  }

  static getMyCommentQuestionList(offset: string) {
    return this.API_GET_MY_COMMENT_QUESTION_LIST + offset;
  }

  static getLoginUrl() {
    return this.API_POST_LOGIN;
  }

  static getRegister() {
    return this.API_POST_REGISTER;
  }

  static getFollowQuestionUrl() {
    return this.API_POST_FOLLOW_QUSTION;
  }

  static getUnFollowQuestionUrl() {
    return this.API_POST_UNFOLLOW_QUESTION;
  }

  static getSubmitQuestionUrl() {
    return this.API_SUBMMIT_QUESTION;
  }

  static getUpdateQuestionUrl() {
    return this.API_PUT_QUESTION_UPDATE;
  }

  static getLikeCommentUrl() {
    return this.API_POST_LIKE_COMMENT;
  }

  static getDisLikeCommentUrl() {
    return this.API_POST_DISLIKE_COMMENT;
  }

  static getCreateCommentOfAnswerUrl() {
    return this.API_POST_SUBMIT_COMMENT_OF_ANSWER;
  }

  static getUpdateCommentOfAnswer() {
    return this.API_PUT_UPDATE_COMMMENT_OF_ANSWER;
  }

  static getDialogQuestionConfig() {
    return this.DIALOG_ASK_QUESTION_CONFIG;
  }

  static getDialogSendMessageConfig() {
    return this.DIALOG_SEND_MESSAGE_CONFIG;
  }

  static getDialogLoginConfig() {
    return this.DIALOG_LOGIN_CONFIG;
  }

  static getDialogRegisterConfig() {
    return this.DIALOG_REGISTER_CONFIG;
  }

  static getSubmitCommentUrl() {
    return this.API_POST_SUBMIT_COMEENT;
  }

  static getLoginUserQuestionList(offset: string, userId: number) {
    return this.API_POST_GET_LOGIN_USER_PUSH_QUESTIONS + offset + '&&userId=' + userId;
  }

  static getSuccessHttpResponseCode() {
    return this.SUCCESS_STATUS;
  }

  static getNoContentHttpResponseCode() {
    return this.NO_CONTENT;
  }

  static getUnauthorizedResponseCode() {
    return this.Unauthorized;
  }

  static getDeleteQuestion() {
    return this.APT_DELETE_QUESTION;
  }

  static getUpdateAnswerUrl() {
    return this.API_PUT_UPDATE_ANWSER;
  }

  static getDeleteAnswerUrl() {
    return this.API_POST_DELETE_ANWSER;
  }

  static getFollowQuestionList(offset: string) {
    return this.API_GET_FOLLOW_QUESTIONS  + offset;
  }

  static getFollowUser() {
    return this.API_POST_FOLLOW_USER;
  }

  static getUnFollowUser() {
    return this.API_POST_UNFOLLOW_USER;
  }

  static getUserFollowers() {
    return this.API_POST_GET_FOLLOWERS;
  }
}
