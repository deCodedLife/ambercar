import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {env} from "../environments/environments";
import {Reply} from "./interfaces/reply-interface";
import {Page} from "./interfaces/page-interface";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  pagesList: Page[] = []

  constructor(
    private http: HttpClient
  ) {
  }

  updatePage( page: Page ) {
    return this.http.post<Reply>( env.API + env.pageModule + 'update.php', Page.toObject( page ) )
  }

  newPage( page: Page ) {
    return this.http.post<Reply>( env.API + env.pageModule + 'add.php', Page.toObject( page ) )
  }

  getPage( uri: string ) {
    return this.http.post<Reply>( env.API + env.pageModule + 'get.php', { uri: uri } )
  }

  updateList() {
    this.http.get<Reply>( env.API + env.pageModule + 'all.php' ).subscribe( reply => {
      if ( reply.status != 200 ) return

      this.pagesList = []
      reply.data.forEach( item => {
        this.pagesList.push( Page.fromObject( item ) )
      } )
    } )
  }
}
