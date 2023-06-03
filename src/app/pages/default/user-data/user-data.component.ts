import {Component, Input} from '@angular/core';
import {IUser} from "../../../services/interfaces/user-interface";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

  @Input() user: IUser = new IUser()
  @Input() isCollapsed: boolean = false
  @Input() useRequired: boolean = false
  currentTab: number = 0

  getBirthDate() : Date {
    return new Date( this.user.bd )
  }

}
