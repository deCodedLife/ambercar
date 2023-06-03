import {Component, Input} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {IUser} from "../../../../services/interfaces/user-interface";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Input() user: IUser
  currentTab: number = 0

  getBirthDate() : Date {
    return new Date( this.user.bd )
  }

}
