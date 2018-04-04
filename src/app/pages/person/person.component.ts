import { Component, OnInit } from '@angular/core';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private editorService: EditorServiceComponent) { }

  ngOnInit(){}

  openEditor() {}
}
