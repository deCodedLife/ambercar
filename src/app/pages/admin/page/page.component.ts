import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {PagesService} from "../../../services/pages.service";
import {Page} from "../../../services/interfaces/page-interface";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent {

  currentPage: Page = null

  updatePage() {
    this.pages.updatePage( this.currentPage ).subscribe( reply => {
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
    let pageID = parseInt( route.snapshot.paramMap.get( "id" ) )
    this.currentPage = pages.pagesList.filter( page => page.id == pageID )[0] ?? new Page()
    this.header.title =  this.currentPage.uri
  }
}
