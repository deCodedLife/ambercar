import {Component} from '@angular/core';
import {InputTypes} from "../../../components/input/input.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IUser} from "../../../services/interfaces/user-interface";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent {

  PASSWORD: InputTypes = InputTypes.PASSWORD

  username: string
  password: string

  emptyFieldsMessage: string = "Ievadiet e-pastu un paroli"
  wrongAuthData: string = "Nepareizi ievadīts pieteikšanās vārds vai parole"

  tryAuth() {
    if ( this.username.trim() == "" || this.password.trim() == "" ) {
      this.snack.open( this.emptyFieldsMessage, null, { duration: 4000 } )
      return
    }

    this.auth.signIn( this.username, this.password ).subscribe( reply => {
      if ( reply.toString() == "" ) {
        this.snack.open( this.wrongAuthData, null, { duration: 4000 } )
        this.password = ""
        return
      }
      this.auth.currentUser = reply.data as IUser
      this.auth.setUser()
      this.router.navigateByUrl( "/profile" )
    } )
  }

  observeTextChanges() {
    this.translate.get( "auth.emptyFields" ).subscribe( text => this.emptyFieldsMessage = text )
    this.translate.get( "auth.wrongData" ).subscribe( text => this.wrongAuthData = text )
  }

  constructor(
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.onLangChange.subscribe( _ => this.observeTextChanges() )
    if ( auth.currentUser != null ) router.navigateByUrl( "/profile" )
  }

}
