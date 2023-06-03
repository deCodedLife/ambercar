import {Component, Input} from '@angular/core';
import {IUser} from "../../../services/interfaces/user-interface";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent {

  @Input() user: IUser = new IUser()
  @Input() useRequired: boolean = false

}
