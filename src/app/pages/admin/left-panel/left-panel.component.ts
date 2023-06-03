import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})

export class LeftPanelAdminComponent {
  constructor(
    public router: Router
  ) {
  }
}
