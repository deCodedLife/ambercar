import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-range-dropdown',
  templateUrl: './range-dropdown.component.html',
  styleUrls: ['./range-dropdown.component.scss']
})

export class RangeDropdownComponent {

  @Input() placeholder: string
  @Input() from: number = 0
  @Input() to: number = 100

  @Output() minChanged = new EventEmitter<number>()
  @Output() maxChanged = new EventEmitter<number>()

  formatLabel(value: number): string {
    return `${value}€`;
  }

}
