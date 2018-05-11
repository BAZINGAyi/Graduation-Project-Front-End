import {FeedsData} from './feedsData.model';

export class Feeds {

  constructor(public createdDate: string,
              public data: FeedsData,
              public id: number,
              public type: number,
              public userId: number
             ) {
  }
}
