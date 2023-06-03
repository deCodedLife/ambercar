import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {

  @Input() title: string
  @Input() bold: boolean
  @Input() highlighted: boolean
  @Input() link: string = ""
  @Input() icon: string

}
