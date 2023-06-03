import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-styled-text',
  templateUrl: './styled-text.component.html',
  styleUrls: ['./styled-text.component.scss']
})

export class StyledTextComponent {

  @Input() content: string

}
