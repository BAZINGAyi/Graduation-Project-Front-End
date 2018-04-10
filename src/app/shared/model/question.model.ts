export class Question {

  constructor(public commentCount: number,
              public content: string,
              public createdDate: string,
              public id: number,
              public title: string,
              public userId: string) {
  }
}
