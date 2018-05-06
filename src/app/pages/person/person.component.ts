import { Component, OnInit } from '@angular/core';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  // 用于标示每个 tab 的 Index
  public static  FOLLOW_PEOPLE = 0;
  public static  FANS = 1;
  public static  FOLLOW_QUESTION = 2;
  public static  PUSH_QUESTION = 3;
  public static  MY_COMMENT_QUESTIONS = 4;
  public static  STATION_LETTER = 5;
  public static  MY_PROFILE = 6;
  // 动态选择第几个 tab 页面
  activeIndexPage = '0';

  constructor(private editorService: EditorServiceComponent,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.activeIndexPage = this.route.snapshot.paramMap.get('id');
  }
}
