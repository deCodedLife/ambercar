import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ConfigsService} from "../../../services/configs.service";
import {SidenavTypes} from "../sidenav/sidenav.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  openSideNav() {
    this.configs.toggleSidenav.next( SidenavTypes.Main )
  }
  constructor( public configs: ConfigsService ) {

  }

}
