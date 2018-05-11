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

  // topic 列表
  topicNameList: IndexTopic[];

  // 当前选择的 topic
  topicId = 0;

  constructor(public topicService: TopicService) {}

  ngOnInit() {
    this.getTopicList();
  }

  private getTopicList() {
    this.topicService
      .getTopicList()
      .subscribe( data => {  this.topicNameList = data; });
  }

  // 选择了对应的 topic
  selectTopic(topic: any) {
    if (topic.topic.id != null) {
      this.topicId = topic.topic.id;
      alert(this.topicId);
    }
  }
}
