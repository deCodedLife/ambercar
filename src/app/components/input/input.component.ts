import {Component, EventEmitter, Input, Output} from '@angular/core';

export enum InputTypes {
  TEXT,
  EMAIL,
  PASSWORD
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {

  @Input() placeholder: string = null
  @Input() isEditable: boolean
  @Input() isVisible: boolean
  @Input() isFlat: boolean
  @Input() type: InputTypes = InputTypes.TEXT

  @Output() changed = new EventEmitter<string>()

  @Input() content: string
  @Input() required: boolean = false

  emit() {
    this.changed.emit( this.content )
  }

  getType() {
    if ( this.type == InputTypes.TEXT ) return "text"
    if ( this.type == InputTypes.EMAIL ) return "email"
    if ( this.type == InputTypes.PASSWORD ) return "password"
    return "tet"
  }

  value: string


}
