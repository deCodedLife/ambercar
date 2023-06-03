import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ThirdPartyApiService} from "../../../services/third-party-api.service";
import {Car} from "../../../services/interfaces/car-interface";
import {ConfigsService} from "../../../services/configs.service";
import {Router} from "@angular/router";
import {CatalogService} from "../../../services/catalog.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit {

  @ViewChild( "reviews" ) reviews: ElementRef
  // @ViewChild( "reviews" ) Greviews: ElementRef

  popularCarID: number[] = [ 2815, 836, 827, 2893, 3616, 3079, 1605, 2926 ]
  brands: string[] = []

  carList: Car[] = []
  rentPeriod: object = {
    "from": new Date( new Date().setDate( new Date().getDate() + 1 ) ),
    "till": new Date( new Date().setDate( new Date().getDate() + 3 ) )
  }

  gotoRent() {
    this.catalog.from = this.rentPeriod[ "from" ]
    this.catalog.till = this.rentPeriod[ "till" ]
    this.router.navigateByUrl('/catalog/rent')
  }

  updatePopularList() {
    this.popularCarID.forEach( carID => {
      this.carList.push( this.configs.getCarDetails( carID ) )
    } )
  }

  constructor(
    private configs: ConfigsService,
    private router: Router,
    private catalog: CatalogService
  ) {

    for (let i = 1; i < 11; i++) {
      this.brands.push( `/assets/brands/${i}.png` )
    }

    if ( configs.carModels.length > 0 ) {
      this.updatePopularList()
      return
    }

    configs.loaded.subscribe( _ => {
      this.updatePopularList()
    } )
  }

  ngAfterViewInit() {
    let reviewsLinks = [
      "https://cdn.trustindex.io/loader.js?b5cc47970212117c3353fa3f2d",
      "https://cdn.trustindex.io/loader.js?b7eae3370a4d1188cb594fd92d",
      "https://cdn.trustindex.io/loader.js?24cce9b7004b119ea7561567ae"
    ]

    for ( let i = 0; i < reviewsLinks.length; i++ ) {
      let element = document.createElement( "script" )
      element.src = reviewsLinks[ i ]
      element.defer = true
      element.async = true
      this.reviews.nativeElement.appendChild(element)
    }
  }

}
