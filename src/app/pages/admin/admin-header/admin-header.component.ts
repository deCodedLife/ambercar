import { Component } from '@angular/core';
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})

export class AdminHeaderComponent {
  constructor(
    public service: HeaderService
  ) {
  }
}
