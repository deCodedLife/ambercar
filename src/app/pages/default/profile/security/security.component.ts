import {Component, Input} from '@angular/core';
import {IUser} from "../../../../services/interfaces/user-interface";
import {AuthService} from "../../../../services/auth.service";
import {InputTypes} from "../../../../components/input/input.component";
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})

export class SecurityComponent {

  @Input()user: IUser
  PASSWORD: InputTypes = InputTypes.PASSWORD

}
