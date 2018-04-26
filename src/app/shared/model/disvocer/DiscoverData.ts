import {Feeds} from './feeds.model';

export class DiscoverData {

  constructor(public code: number,
              public feeds: Feeds[]) {
  }
}
