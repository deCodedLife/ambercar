import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ThirdPartyApiService} from "./third-party-api.service";
import {Car} from "./interfaces/car-interface";
import {Observable, Subject} from "rxjs";
import {Filter} from "./interfaces/filter-interface";
import {CookieService} from "ngx-cookie-service";
import {SidenavTypes} from "../pages/default/sidenav/sidenav.component";

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  carsToRent: Car[] = []
  carModels: Car[] = []

  toggleSidenav = new Subject<SidenavTypes>()
  closeSidenav = new Subject()

  loaded = new Subject()
  modelsLoaded = new Subject()

  constructor(
    private translate: TranslateService,
    private api: ThirdPartyApiService,
    private cookie: CookieService
  )
  {
    let defaultLang = 'lv-LV'

    if ( cookie.check( 'lang' ) )
      defaultLang = cookie.get( 'lang' )

    translate.addLangs( [ 'en-US', 'lv-LV', 'ru-RU' ] )
    translate.setDefaultLang( defaultLang )
    translate.use( defaultLang )
    this.currentLanguage = defaultLang;
  }

  update() {
    this.api.getCars( "carsToRent" ).subscribe( response => {
      this.carsToRent = response as Car[]
      this.loaded.next( response as Car[] )
    } )
    this.api.getCars( "carModels" ).subscribe( response => {
      this.carModels = response as Car[]
      this.modelsLoaded.next( response as Car[] )
    } )
  }

  currentLanguage: string

  useLanguage( language: string ): void
  {
    this.cookie.set( 'lang', language )
    this.currentLanguage = language
    this.translate.use( language )
  }

  getCarModelID( modelID: number ): Car {
    for (let i = 0; i < this.carModels.length; i++) {

      let currentObject = this.carModels.at( i )
      if ( currentObject.id == modelID ) return currentObject

    }

    return null
  }

  getCarDetails( id: number ): Car {
    return this.carsToRent.filter(item => item.id == id )[0]
  }

}
