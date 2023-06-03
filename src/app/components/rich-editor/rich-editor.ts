import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as SuperEdtor from "../../../ckeditor/build/ckEditor";

export enum InputTypes {
  TEXT,
  EMAIL,
  PASSWORD
}

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.html',
  styleUrls: ['./rich-editor.scss']
})

export class RichEditor {

  Editor = SuperEdtor

  @Input() data: string = ""
  @Output() edited = new EventEmitter<string>()

  ngOnInit() {
    // this.Editor.execute( 'fontColor', { value: 'rgb(255, 255, 255)' } );
  }


}
