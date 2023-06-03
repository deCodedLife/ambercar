import {Component, ViewChild} from '@angular/core';
import {ConfigsService} from "./services/configs.service";
import {MatSidenav} from "@angular/material/sidenav";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "./services/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ambercar';
  isClosed: boolean = false

  isAdmin() {
    return this.router.url.split( "admin" ).length > 1
  }

  isSignIn() {
    return this.router.url.split( "signIn" ).length > 1
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    public config: ConfigsService,
    private route: ActivatedRoute,
    private router: Router
  )
  {
    config.update()
    config.toggleSidenav.subscribe( type => {
      document.body.style.overflow = 'hidden'
      this.sidenav.open()
    } )
    config.closeSidenav.subscribe( _ => {
      document.body.style.overflow = 'auto'
      this.sidenav.close()
    } )
  }

}
