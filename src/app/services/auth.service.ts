import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {env} from "../environments/environments";
import {IUser} from "./interfaces/user-interface";
import { CookieService } from "ngx-cookie-service";
import {Reply} from "./interfaces/reply-interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: IUser = null
  private httpParams = new HttpParams( {
    fromObject: {
      q: "user"
    }
  } )

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {
    if ( !cookie.check( "user_ID" ) ) return;
    this.currentUser = new IUser()

    Object.keys( new IUser() ).forEach( key => {
      this.currentUser[ key ] = cookie.get( `user_${key}` ) ?? ""
    } )
  }

  setUser() {
    Object.keys( new IUser() ).forEach( key => {
      this.cookie.set( `user_${key}`, this.currentUser[ key ] )
    } )
  }

  signIn(username: string, password: string ) {

    let params = this.httpParams.appendAll( {
      "user": username,
      "password": password
    } )

    return this.http.get<Reply>( env.API + "users.php", { params: params } )

  }

  getData( userID: number ) {

    let params = this.httpParams.appendAll( {
      "ID": userID
    } )

    return this.http.get<Reply>( env.API + "users.php", { params: params } )

  }

  createUser( user: IUser ) {

    let params = new HttpParams( { fromObject: { q: "new" } } )

    Object.create(user).keys.forEach( key => {
      params = params.append( key, user[ key ] )
    } )

    return this.http.get<Reply>( env.API + "users.php", { params: params } )

  }
}
