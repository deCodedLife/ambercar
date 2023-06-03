import {Component, Input, Output} from '@angular/core';
import {InputTypes} from "../../../components/input/input.component";
import {IUser} from "../../../services/interfaces/user-interface";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {

  PASSWORD: InputTypes = InputTypes.PASSWORD

  @Input() user: IUser = new IUser()
  @Output() isCorrect: boolean = false

  currentTab: number = 0

  checkData() {

    if ( this.user.name.trim() == "" ) this.isCorrect = false
    if ( this.user.tel.trim() == "" ) this.isCorrect = false

  }

  getBirthDate() : Date {
    return new Date( this.user.bd )
  }

}
