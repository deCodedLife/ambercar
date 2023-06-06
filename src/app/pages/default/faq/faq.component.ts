import { Component } from '@angular/core';

const sections = [
  ""
]

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent {

  currentSection: number = 0

}
