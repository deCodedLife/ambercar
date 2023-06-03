import { Injectable } from '@angular/core';
import { env } from '../environments/environments';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs";
import {Car} from "./interfaces/car-interface";
import {Reply} from "./interfaces/reply-interface";

@Injectable({
  providedIn: 'root'
})

export class ThirdPartyApiService {

  getAdditionals() {
    return this.http.get( env.API + 'getConfiguration.php' )
  }

  getDateFormatted( d: Date, f: string ): string {

    let z = {
      M: d.getMonth() + 1,
      d: d.getDate(),
      h: d.getHours(),
      m: d.getMinutes(),
      s: d.getSeconds()
    };

    f = f.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
      return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return f.replace(/(y+)/g, function(v) {
      return d.getFullYear().toString().slice(-v.length)
    });
  }

  constructor( private http: HttpClient) { }

  createReservation( details: object ) {

    let paramsDetails = Object.create(null)

    for (let i = 0; i < Object.keys(details).length; i++) {
      let key = Object.keys(details)[i]
      if (details[key] == null) continue
      paramsDetails[key] = details[key]
    }

    let params = this.parseParams( paramsDetails )
    params = params.append("q", "shedule/save")

    return this.http.get<Reply>(env.API + 'cars.php', { params } )

  }

  convert( data: object ) : Car {
    let car: Car = {
      id: parseInt( data[ "ID" ] ),
      teamID: data[ "teamID" ],
      brand: data[ "marka" ],
      model: data[ "modelis" ],
      type: data[ "type" ],
      totalSum: parseInt( data[ "sum" ] ),
      color: data[ "color" ],
      sellPrice: data[ "sellPrice" ],
      rentPrice: data[ "daysum" ],
      mainImage: data[ "image0" ],
      images: [
        data[ "image0" ],
        data[ "image1" ],
        data[ "image2" ],
        data[ "image3" ],
        data[ "image4" ],
        data[ "image5" ],
        data[ "image6" ],
        data[ "image7" ],
        data[ "image8" ]
      ],
      group: data[ "group" ],
      code: data[ "code" ],
      year: data[ "year" ],
      doors: data[ "doors" ],
      seats: data[ "seats" ],
      transmission: data[ "ātrumkārba" ],
      safety_money: data[ "safety_money" ],
      fuel: data[ "fuel" ],
      engine_size: data[ "engine_size" ],
      chassisNumber: data[ "chassisNumber" ],
      fuelType: data[ "mfuel" ] ?? data[ "fuel_consumption" ],
      gearbox: data[ "gearbox" ],
      selfrisk: data[ "selfrisk" ],
      fuel_consumption: data[ "fuel_consumption" ],
      LVnumber: data[ "LVnumber" ],
      REGnumber: data[ "REGnumber" ],
      TA: data[ "TA" ],
      OCTA: data[ "OCTA" ],
      KASKO: data[ "KASKO" ],
      APKOPE: data[ "APKOPE" ],
      hasConditioner: data[ "conditioner" ] == "1",
      capacity: [],
      priceMonth: data[ "priceMonth" ],
      pledge: data[ "safety_money" ],
      sumPerDay: data[ "daysum" ],
      model_id: data[ "descriptin_id" ]
    }

    if ( data[ "image1" ] != "" ) car.images.push( data[ "image1" ] )
    if ( data[ "image2" ] != "" ) car.images.push( data[ "image2" ] )
    if ( data[ "image3" ] != "" ) car.images.push( data[ "image3" ] )
    if ( data[ "image4" ] != "" ) car.images.push( data[ "image4" ] )
    if ( data[ "image5" ] != "" ) car.images.push( data[ "image5" ] )
    if ( data[ "image6" ] != "" ) car.images.push( data[ "image6" ] )
    if ( data[ "image7" ] != "" ) car.images.push( data[ "image7" ] )
    if ( data[ "image8" ] != "" ) car.images.push( data[ "image8" ] )
    if ( data[ "cCapacity" ] ) car.capacity = data[ "cCapacity" ].split( "+" ) as number[]
    if ( !car.rentPrice ) car.rentPrice = data[ "actualDayPriceToMonth" ]
    if ( !car.rentPrice ) car.rentPrice = data[ "actualDayPrice" ]

    return car;

  }
  parseParams( params: object ): HttpParams {

    if ( params == null ) return new HttpParams();
    let requestParams = new HttpParams();

    Object.keys( params ).forEach( key => {
      if ( key == null ) return;

      if ( key == "from" ) params[ key ] = this.getDateFormatted( params[ key ], "yyyy-MM-dd hh:mm" )
      if ( key == "till" ) params[ key ] = this.getDateFormatted( params[ key ], "yyyy-MM-dd hh:mm" )

      if ( key == "all" ) {
        Object.keys( params[ key ] ).forEach( param => {
          requestParams = requestParams.append( `plus[${param}]`, params[ key ][ param ] )
        } )
        return
      }

      requestParams = requestParams.append( key, params[ key ] )
    } )

    return requestParams

  }

  isAvailable( request: object ) {

    let params = this.parseParams( request )
    params = params.append( "q", "carModels/carDays" )

    return this.http.get<Reply>( env.API + 'cars.php', { params } )

  }

  getHistory( request: object ) {

    let params = this.parseParams( request )
    params = params.append( "q", "contracts" )

    return this.http.get<Reply>( env.API + `cars.php`, { params } )
  }

  getCars( type: string, request: object = null, piece: boolean = false ) {

    let params = this.parseParams( request )
    params = params.append( "q", type )

    return this.http.get<Reply>( env.API + `cars.php`, { params } ).pipe( map( (response: Reply) => {
      if ( piece ) return this.convert( response as object )

      let cars: object[] = []
      response.data.forEach( item => cars.push( this.convert( item ) ) )

      return cars

    } ) )

  }

  checkIP() {
    return this.http.get( env.API + "getIP.php", { responseType: "text" } )
  }

  makePayment( params: object ) {

    let form = document.createElement( 'form' )
    form.method = 'POST'
    form.action = 'https://schedulebull.com/firstData/?action=startsmstrans&m=ambercar'
    form.style.display = 'none'

    Object.keys( params ).forEach( key => {
      let field = document.createElement( "input" )
      field.name = key
      field.value = params[ key ]

      form.appendChild( field )
    } )

    document.body.appendChild( form )
    form.submit()

  }

}
