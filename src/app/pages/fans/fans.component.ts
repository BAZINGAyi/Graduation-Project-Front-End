import { Component, OnInit } from '@angular/core';
import {EditorServiceComponent} from '../../shared/editor/editorService.component';

@Component({
  selector: 'app-fans',
  templateUrl: './fans.component.html',
  styleUrls: ['./fans.component.css']
})
export class FansComponent implements OnInit {

  constructor(private editorService: EditorServiceComponent) { }

  ngOnInit(){
    this.editorService.appendEditorToContainer("1zhang");
  }

  openEditor() {

  }
}
