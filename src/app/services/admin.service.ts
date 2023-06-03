import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Reply} from "./interfaces/reply-interface";
import {env} from "../environments/environments";
import {map} from "rxjs";
import {Route, Router} from "@angular/router";

export class IAdmin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  admin: IAdmin = null

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    if ( !cookieService.check( "a_username" ) || !cookieService.check( "a_password" ) ) return;
    this.admin = new IAdmin()
    this.admin.username = cookieService.get( "a_username" )
    this.admin.password = cookieService.get( "a_password" )
  }

  signIn( data: IAdmin = this.admin ) {
    return this.http.post<Reply>( env.API + env.adminModule + "auth.php", data as object ).pipe( map( (response: Reply) => {
      if ( response.status != 200) {
        this.router.navigate( [ 'admin/signIn' ] )
        return response
      }
      this.admin = new IAdmin()
      this.cookieService.set( "a_username", data.username )
      this.cookieService.set( "a_password", data.password )
      this.admin.username = data.username
      this.admin.password = data.password
      return response
    } ) )
  }

}
