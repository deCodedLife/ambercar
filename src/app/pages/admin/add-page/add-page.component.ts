import { Component } from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {PagesService} from "../../../services/pages.service";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Page} from "../../../services/interfaces/page-interface";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})

export class AddPageComponent {

  currentPage: Page = null

  addPage() {
    this.pages.newPage( this.currentPage ).subscribe( reply => {
      if ( reply.status != 200 ) {
        this.snack.open( 'Что-то пошло не так', null, {
          duration: 3000
        } )
        return
      }
      this.snack.open( 'Успешно', null, {
        duration: 3000
      } )
    } )
  }

  constructor(
    private header: HeaderService,
    private pages: PagesService,
    private route: ActivatedRoute,
    private admin: AdminService,
    private snack: MatSnackBar
  ) {
    admin.signIn().subscribe()
    this.currentPage = new Page()
    this.header.title =  "Новая страница"
  }
}
