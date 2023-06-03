import { Component } from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {InputTypes} from "../../../components/input/input.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthAdminComponent {

  username: string = ""
  password: string = ""

  PASSWORD: InputTypes = InputTypes.PASSWORD
  wrongData: ""

  signIn()
  {
    this.adminService.signIn( {
      username: this.username,
      password: this.password
    } ).subscribe( reply => {
      if ( reply.status != 200 ) {
        this.snackBar.open( "Auth data is not correct", null, {
          duration: 3000
        } )
        return
      }
      this.redirect()
    } )
  }

  redirect() {
    this.router.navigate([ '/admin/pages' ])
  }

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.adminService.signIn().subscribe( reply => {
      if ( reply.status != 200 ) return
      this.redirect()
    } )

    this.translateService.onDefaultLangChange.subscribe( lang => {
      this.translateService.get( "auth.wrongData" ).subscribe( text => this.wrongData = text )
    } )
  }

}
