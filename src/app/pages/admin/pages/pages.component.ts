import { Component } from '@angular/core';
import {PagesService} from "../../../services/pages.service";
import {HeaderService} from "../../../services/header.service";
import {Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent {

  constructor(
    public pages: PagesService,
    public header: HeaderService,
    public router: Router,
    private admin: AdminService
  ) {
    admin.signIn().subscribe()
    pages.updateList()
    header.title = "Контентные страницы"
  }
}
