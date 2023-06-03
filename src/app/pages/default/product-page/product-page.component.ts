import {Component} from '@angular/core';
import {ThirdPartyApiService} from "../../../services/third-party-api.service";
import {ActivatedRoute} from "@angular/router";
import {Car} from "../../../services/interfaces/car-interface";
import {CarouselItem} from "../../../components/carousel/carousel.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {AdditionalType} from "./additional/additional.component";
import {ConfigsService} from "../../../services/configs.service";
import {ProductServiceService} from "../../../services/product-service.service";
import {IUser} from "../../../services/interfaces/user-interface";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent {

  isDev = true
  isForSale: boolean = false
  currentUser: IUser = this.authService.currentUser
  isEntityIndex: number = 0

  places: string[] = [
    "Rīga, Katrīnas dambis 29",
    "Lidosta Rīga (RIX)",
    "Rīgas Dzelzceļa stacija",
    "Rīgas Pasažieru osta",
    "Rīgas robežās",
    "Jūrmala",
    "Cits"
  ]
  millageOptions = { "unlimitedMileage": 19, "200Miles": 5, "100Miles": 0 }
  countryOptions = { "Izbrauksana no LV": 5, "willNotLeave": 0 }
  insuranceOptions = { "KASKO riepas un stikli": 3, "KASKO BEZ PAŠRISKA": 16 }
  toolsOptions = { "Navigacija": 5, "Bērnu ratiņi": 5, "Jumta bagāžnieks": 3, "Videoreģistrators": 3 }
  childSeatsOptions = { "Bernu sedeklitis 0-1 gads": 5, "Bêrnu sedeklitis 1-3 gadi": 5, "Bērnu Bernu sedeklitis 3-5 gadi": 5, "Nav nepieciešams": 0 }

  CHECKBOX = AdditionalType.CHECKBOX
  CHECKBOX_GROUP = AdditionalType.CHECKBOX_GROUP

  from: Date = null
  till: Date = null

  placeFrom: string = this.places[0]
  placeTo: string = this.places[0]

  millageSelected: number[] = []
  willLeaveCountry: number[] = []
  insurance: number[] = []
  tools: number[] = []
  childSeats: number[] = []


  productID: string
  productDetails: Car

  carouselItems: CarouselItem[] = []

  valid: boolean = false
  termsAccepted: boolean = false
  isPayment: boolean = true

  totalPrice: number = 0
  carPrice: number = 0

  unavailable: string = "Mašīna nav pieejama jūsu izvēlētajam periodam"
  success: string = "Veiksmīgi"
  error: string = "Kaut kas nogāja greizi"
  fieldsError: string = "Aizpildiet visus nepieciešamos laukus"

  changeDate( changes: object ) {
    this.from = changes[ "from" ]
    this.till = changes[ "till" ]
    this.loadData()
  }


  toogleReservationType( isPayment: boolean ) {
    this.isPayment = isPayment
  }


  pricer( array1: number[], map: object ): number {

    if ( array1.length < 1  ) return 0;

    let price = 0
    let arrayKeys = Object.keys( map )

    for ( let i = 0; i < array1.length; i++ ) {
      price += map[ arrayKeys[ array1[ i ] ] ]
    }

    return price
  }

  containsWeekend(d1, d2)
  {
    let interval = (d2 - d1) / (1000 * 60 * 60 * 24); // convert to days
    if (interval > 5) {
      return true;    // must contain a weekend day
    }
    let day1 = d1.getDay();
    let day2 = d2.getDay();
    return !(day1 > 0 && day2 < 6 && day2 > day1);
  }

  offTime() {
    if ( this.from != null && this.till != null ) {
      if (
        this.from.getHours() < 8 ||
        this.from.getHours() > 20 ||
        this.containsWeekend( this.from, this.till )
      ) return true
    }
    return false
  }


  calculatePrice() {
    if ( !this.from || !this.till ) return
    let price = this.productDetails.totalSum ?? 0

    let rentDays = this.till.getTime() - this.from.getTime()
    rentDays = Math.ceil( rentDays / (1000 * 60 * 60 * 24) )
    rentDays = Math.abs( rentDays )
    rentDays = Math.min( 10, rentDays )

    if ( this.offTime() ) price += 40

    price += this.pricer( this.millageSelected, this.millageOptions )
    price += rentDays * this.pricer( this.willLeaveCountry, this.countryOptions )

    price += this.pricer( this.insurance, this.insuranceOptions )
    price += rentDays * this.pricer( this.tools, this.toolsOptions )

    price += rentDays * this.pricer( this.childSeats, this.childSeatsOptions )

    this.carPrice = this.productDetails.totalSum + this.pricer( this.millageSelected, this.millageOptions )
    this.totalPrice = price
  }

  checkAvailable() {
    if ( this.isForSale ) return
    this.api.isAvailable( {
      "model": this.productDetails.model_id,
      "from": this.from ?? new Date(),
      "till": this.till ?? new Date(new Date().setDate( new Date().getDate() + 3 ))
    } ).subscribe( response => {
      this.valid = Object.keys(response.data).filter( item => response.data[ item ] == 0 ).length == 0
      if ( !this.valid ) {
        this.showNotAvailable()
      }
    } )
  }

  showNotAvailable() {
    if ( this.isForSale ) return
    this.snackBar.open( this.unavailable, null, { duration: 3000 } )
  }



   loadData( update: boolean = false ) {
     this.valid = false
     let request = { "carID": this.productID }

     if ( this.till ) request[ "till" ] = this.till
     if ( this.from ) request[ "from" ] = this.from

     this.api.getCars( "carsToRent", request ).subscribe( response => {

       if ( typeof ((response[0] as Car)) == "undefined" ) return

       this.productDetails = response[0]
       if ( update ) this.updateImages()
       this.calculatePrice()
     } )

     if ( !this.from || !this.till ) {
       this.showNotAvailable()
       return;
     }

     this.checkAvailable()
  }

  observeData() {
    this.translate.get( "product.unavailable" ).subscribe( d => this.unavailable = d )
    this.translate.get( "product.success" ).subscribe( d => this.success = d )
    this.translate.get( "product.error" ).subscribe( d => this.error = d )
  }

  updateImages() {
    let mobile = window.innerWidth < 767 ? '&x=500&y=400' : '&x=700&y=400'
    mobile = window.innerWidth < 500 ? '&x=400&y=300' : mobile

    this.productDetails.images.forEach( item => {
      if ( item == "" ) return
      this.carouselItems.push({
        image: 'https://img.schedulebull.com/' + item + mobile,
        title: '',
        description: ''
      })
    } )
  }

  isValid() {
    if ( !this.termsAccepted ) return true;
    return !this.valid && !this.isForSale;

    // return (!this.valid && !this.isForSale) || !this.termsAccepted
  }

  constructor(
    private api: ThirdPartyApiService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private configs: ConfigsService,
    private product: ProductServiceService,
    private authService: AuthService
  ) {
    this.isForSale = (route.snapshot.paramMap.get( "type" ) ?? "") == "ransom"
    this.productID = route.snapshot.paramMap.get( 'id' )
    if ( product.selectedCar != null ) {
      this.productDetails = product.selectedCar
    }
    this.loadData( true )

    this.translate.onLangChange.subscribe( _ => this.observeData() )
    this.observeData()
  }

  additionals( array1: number[], map: object ): object[] {
    let objects: object[] = []
    let arrayKeys = Object.keys( map )

    for ( let i = 0; i < array1.length; i++ ) {
      if ( map[ arrayKeys[ array1[ i ] ] ] == 0 ) continue;
      let temp = Object.create(null)
      temp[ arrayKeys[ array1[ i ] ] ] = map[ arrayKeys[ array1[ i ] ] ]
      objects.push( temp )
    }

    return objects
  }

  createReservation () {
    let request = {
      "from": this.from ?? new Date( new Date().setDate( new Date().getDate() + 1 ) ),
      "till": this.till ?? new Date( new Date().setDate( new Date().getDate() + 3 ) ),
      "client": "Test client",
      "phone": "+79780398794",
      "price": this.carPrice,
      "carID": this.productID,
      "place_from": this.placeFrom,
      "place_to": this.placeTo,
      "all": {}
    }

    let leaveCountry = this.additionals( this.willLeaveCountry, this.countryOptions )
    let insurance = this.additionals( this.insurance, this.insuranceOptions )
    let tools = this.additionals( this.tools, this.toolsOptions )
    let childSeats = this.additionals( this.childSeats, this.childSeatsOptions )

    leaveCountry.forEach( obj => {Object.keys( obj ).forEach( key => {request[ "all" ][ key ] = obj[ key ]} )} )
    insurance.forEach( obj => {Object.keys( obj ).forEach( key => {request[ "all" ][ key ] = obj[ key ]} )} )
    tools.forEach( obj => {Object.keys( obj ).forEach( key => {request[ "all" ][ key ] = obj[ key ]} )} )
    childSeats.forEach( obj => {Object.keys(obj).forEach( key => {request[ "all" ][ key ] = obj[ key ]} )} )


    if ( this.offTime() ) request[ "all" ][ "Nakts piegade no 20.00-8.00" ] = 40

    this.api.createReservation( request ).subscribe( response => {

      if ( response[ "error" ] != null && typeof ( response[ "error" ] ) != "undefined" ) {
        this.snackBar.open( this.error, null, { duration: 10000 } )
        return
      }

      if ( !this.isPayment ) {
        this.snackBar.open( this.success, null, { duration: 10000 } )
        return
      }

      let reservationID = response[ "ID" ]

      if ( this.isForSale ) return

      this.api.checkIP().subscribe( response => {

        this.api.makePayment( {
          "post_amount": this.totalPrice * 100,
          "post_currency": "978",
          "post_ip": response,
          "post_description": reservationID,
          "post_language": this.configs.currentLanguage.slice(-2)
        } )

      } )

    } )
  }

}
