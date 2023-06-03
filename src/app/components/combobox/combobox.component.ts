import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})

export class ComboboxComponent implements OnChanges {

  @Input() placeholder: string
  @Input() value: string
  @Input() required: boolean = false
  @Input() useSearch: boolean = false
  @Input() isFlat: boolean = false
  @Input() isEditable: boolean = false

  filteredList: string[] = []
  isVisible: boolean = false
  @Input() objectsList: string[] = []

  @Output() itemSelected = new EventEmitter<string>()
  @Output() indexSelected = new EventEmitter<number>()

  filter() {
    if ( this.value == "" && this.useSearch ) {
      this.filteredList = this.objectsList
      return
    }

    this.filteredList = this.objectsList.filter( item => item.toLowerCase().includes( this.value.toLowerCase() ) )
  }

  update(e: string, index: number) {
    let textValue = this.filteredList[ index ]
    let indexValue = this.objectsList.indexOf( textValue )

    this.value = e
    this.itemSelected.emit( this.objectsList.at( indexValue ) )
    this.indexSelected.emit( index )
    this.isVisible = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( typeof ( changes['objectsList'] ) != "undefined" )
      this.filteredList = changes['objectsList'].currentValue;
  }

}
