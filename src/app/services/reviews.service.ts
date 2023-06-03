import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Reply} from "./interfaces/reply-interface";
import {env} from "../environments/environments";

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {
  constructor(
    private http: HttpClient
  ) {}

  addNew( reply: Reply ) {
    this.http.post( env.API + env.reviewsModule + "add.php", reply as object ).subscribe()
  }

  update( reply: Reply ) {
    this.http.post( env.API + env.reviewsModule + "update.php", reply as object ).subscribe()
  }

  remove( id: number ) {
    let params = { "id": id }
    this.http.get( env.API + env.reviewsModule + "remove.php", { params: params } )
  }

  getByPage( page: string ) {
    let params = new HttpParams( { fromObject: {
      "page": page
    } } )
    return this.http.get<Reply>( env.API + env.reviewsModule + "get.php", { params: params } )
  }
}
