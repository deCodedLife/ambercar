import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../../../services/interfaces/user-interface";
import {ThirdPartyApiService} from "../../../../services/third-party-api.service";
import {Car} from "../../../../services/interfaces/car-interface";
import {ConfigsService} from "../../../../services/configs.service";
import {Reservation} from "../../../../services/interfaces/reservation-interface";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() user: IUser
  items: Reservation[] = []
  cars: Car[] = []

  loadData() {
    this.api.getHistory( { "telnr": this.user.tel } ).subscribe( response => {
      (response.data as Reservation[]).forEach( item => {
        this.cars.push( this.configs.getCarDetails( item.carID ) )
        console.log( this.cars )
      } )
      this.items = response.data as Reservation[]
    } )
  }

  ngOnInit() {

    if ( this.configs.carsToRent.length > 0 ) {
      this.configs.loaded.subscribe( _ => this.loadData() )
      return
    }

    this.configs.loaded.subscribe( _ => {
      this.loadData()
    } )
  }

  constructor(
    private api: ThirdPartyApiService,
    public configs: ConfigsService
  ) {}

}
