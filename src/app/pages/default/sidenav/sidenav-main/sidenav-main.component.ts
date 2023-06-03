import { Component } from '@angular/core';
import {ConfigsService} from "../../../../services/configs.service";

@Component({
  selector: 'app-sidenav-main',
  templateUrl: './sidenav-main.component.html',
  styleUrls: ['./sidenav-main.component.scss']
})

export class SidenavMainComponent {
  constructor( public config: ConfigsService ) {}
  close() {
    this.config.closeSidenav.next(null)
  }
}
