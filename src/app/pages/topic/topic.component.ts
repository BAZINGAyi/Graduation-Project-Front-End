import { Component, OnInit } from '@angular/core';
import {Topic} from '../../shared/model/topic.model';
import {TopicService} from './shared/topic.service';
import {IndexTopic} from '../../shared/model/topicIndex.model';



@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  topicNameList: IndexTopic[];

  constructor(public topicService: TopicService) {}

  ngOnInit() {
    this.getTopicList();
  }

  private getTopicList() {
    this.topicService
      .getTopicList()
      .subscribe( data => {  this.topicNameList = data; });
  }

}
