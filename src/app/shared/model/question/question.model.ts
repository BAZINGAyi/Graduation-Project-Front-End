export class Question {

  constructor(public commentCount: number,
              public content: string,
              public markdownContent: string,
              public createdDate: string,
              public id: number,
              public title: string,
              public userId: string,
              public topicId: number) {
  }
}
