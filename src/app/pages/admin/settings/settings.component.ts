import { Component } from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent {

  constructor(
    private header: HeaderService,
    private admin: AdminService
  ) {
    admin.signIn().subscribe()
    header.title = "Настройки"
  }
}
