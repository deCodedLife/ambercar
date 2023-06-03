import {Component, Input, OnInit} from '@angular/core';
import {ThirdPartyApiService} from "../../services/third-party-api.service";
import {Car} from "../../services/interfaces/car-interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {

  @Input() productDetails: Car

  isForSale: boolean = false
  randomImage: string

  constructor(
    private api: ThirdPartyApiService,
    private route: ActivatedRoute,
  ) {
    this.randomImage = "car-interface.ts-" + Math.floor( Math.random() * 3 + 1 ) + ".jpg"
    this.isForSale = false
    route.paramMap.subscribe( map => {
      if ( (map.get( "type" ) ?? "") == "ransom" )  this.isForSale = true
      else this.isForSale = false
    } )
  }


  protected readonly String = String;
}
