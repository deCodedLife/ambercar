import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PagesService} from "../../../services/pages.service";
import {Page} from "../../../services/interfaces/page-interface";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-universal',
  templateUrl: './universal.component.html',
  styleUrls: ['./universal.component.scss']
})

export class UniversalComponent implements AfterViewInit {

  currentPage: Page = null
  currentLang: string = "lv-LV"
  @ViewChild("container") container

  ngAfterViewInit() {
    let uri = this.route.snapshot.paramMap.get( 'page' )
    this.pages.getPage( uri ).subscribe( reply => {
      if ( reply.status != 200 ) return
      this.currentPage = Page.fromObject( reply.data[ 0 ] )
      this.updateContent()
    } )
  }

  updateContent() {
    if ( this.currentLang == 'lv-LV' ) this.container.nativeElement.innerHTML = this.currentPage.lv
    if ( this.currentLang == 'en-US' ) this.container.nativeElement.innerHTML = this.currentPage.us
    if ( this.currentLang == 'ru-RU' ) this.container.nativeElement.innerHTML = this.currentPage.ru

    let images = document.getElementsByTagName("img")

    for( let i = 0; i < images.length; i++ ) {
      images[i].style.maxWidth = "100%"
    }
  }

  constructor(
    private route: ActivatedRoute,
    private pages: PagesService,
    private translate: TranslateService
  ) {
    translate.onLangChange.subscribe( lang => {
      this.currentLang = lang.lang
      this.updateContent()
    } )
  }
}
