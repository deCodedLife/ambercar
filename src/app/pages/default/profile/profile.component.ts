import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {IUser} from "../../../services/interfaces/user-interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  user: IUser
  currentTab: number = 0

  getBirthDate() : Date {
    return new Date( this.user.bd )
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    if ( this.auth.currentUser == null ) {
      router.navigateByUrl( '/auth' )
      return
    }

    this.user = auth.currentUser

    auth.getData( auth.currentUser.ID ).subscribe( user => {
      this.user = user.data as IUser
      auth.currentUser = user.data as IUser
      auth.setUser()
    } )
  }

}
