export class Comment {

  constructor(public id: number,
              public status: number,
              public entityType: string,
              public entityId: string,
              public createdDate: string,
              public content: string,
              public markdownContent: string,
              public userId: string) {
  }
}
