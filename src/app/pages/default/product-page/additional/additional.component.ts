import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";

export enum AdditionalType {
  RADIO_GROUP,
  CHECKBOX,
  CHECKBOX_GROUP
}
@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})

export class AdditionalComponent {

  @Input() type: AdditionalType = AdditionalType.RADIO_GROUP
  @Input() description: string
  @Input() title: string
  @Input() items: string[] = []
  @Input() values: number[] = []

  @Output() selected = new EventEmitter<number[]>()

  RADIO_GROUP = AdditionalType.RADIO_GROUP
  CHECKBOX = AdditionalType.CHECKBOX
  CHECKBOX_GROUP = AdditionalType.CHECKBOX_GROUP

  selectRadio( index: number ) {
    this.values = [ index ]
    this.selected.emit( this.values )
  }

  selectCheckbox( index: number, isChecked: boolean ) {
    if ( isChecked ) this.values.push( index )
    else this.values = this.values.filter( item => item != index )
    this.selected.emit( this.values )
  }

}
