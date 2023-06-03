import {Component, ViewChild} from '@angular/core';
import {ConfigsService} from "../../../services/configs.service";
import {MatSidenav} from "@angular/material/sidenav";
export enum SidenavTypes {
  Main,
  Filters
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent {
  MainType: SidenavTypes = SidenavTypes.Main
  sidenavType: SidenavTypes = SidenavTypes.Main

  close() {
    this.config.closeSidenav.next(null)
  }

  constructor( public config: ConfigsService ) {
    config.toggleSidenav.subscribe( type => this.sidenavType = type )
  }
}
