import {Component} from '@angular/core';
import {ThirdPartyApiService} from "../../../services/third-party-api.service";
import {HttpParams} from "@angular/common/http";
import {Car} from "../../../services/interfaces/car-interface";
import {Filter} from "../../../services/interfaces/filter-interface";
import {CatalogService, SortTypes} from "../../../services/catalog.service";
import {ActivatedRoute} from "@angular/router";
import {angularMajorCompatGuarantee} from "@angular/cli/src/commands/update/schematic";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent {

  productsList: Car[] = []
  filteredList: Car[] = []

  currentSortType: SortTypes = SortTypes.Increase
  currentFilter: Filter = new Filter()

  isForSale: boolean = false


  decreaseSort = ( a, b ) => { return b.rentPrice - a.rentPrice }
  increaseSort = ( a, b ) => { return a.rentPrice - b.rentPrice }
  byNameSort = ( a, b ) => { return a.brand.localeCompare( b.brand ) }

  applySort( type: SortTypes ) {
    this.currentSortType = type;
    if ( type == SortTypes.Increase ) this.filteredList = this.filteredList.sort( (a, b) => this.increaseSort( a, b ) )
    if ( type == SortTypes.Decrease ) this.filteredList = this.filteredList.sort( (a, b) => this.decreaseSort( a, b ) )
    if ( type == SortTypes.ByName ) this.filteredList = this.filteredList.sort( (a, b) => this.byNameSort( a, b ) )
  }

  async applyFilters( filter: Filter ) {

    this.filteredList = this.productsList

    filter.convert()

    if ( filter.dateUpdated ) {
      this.productsList = []
      this.filteredList = []
      this.getByDate( filter.periodStart, filter.periodEnd )
      return
    }

    this.currentFilter = filter

    if ( this.isForSale )
      this.filteredList = this.filteredList.filter( product => product.priceMonth != 0 )

    if ( filter.brand )
      this.filteredList = this.filteredList.filter( product => product.brand.toUpperCase() == filter.brand )
    if ( filter.model )
      this.filteredList = this.filteredList.filter( product => product.model == filter.model )
    if ( filter.priceTo )
      this.filteredList = this.filteredList.filter( product => product.rentPrice <= filter.priceTo )
      this.filteredList = this.filteredList.filter( product => product.rentPrice >= filter.priceFrom )

    if ( filter.color )
      this.filteredList = this.filteredList.filter( product => product.color == filter.color )

    if ( filter.passengersCount )
      this.filteredList = this.filteredList.filter( product => product.seats >= filter.passengersCount  )

    this.applySort( this.currentSortType )

  }

  getByDate( periodStart, periodEnd ) {

    if ( periodStart == null ) periodStart = new Date()
    if ( periodEnd == null ) periodEnd = new Date( new Date().setDate( new Date().getDate() + 1) )

    periodStart = this.dateFormatted( periodStart )
    periodEnd = this.dateFormatted( periodEnd )

    this.catalog.from = periodStart
    this.catalog.till = periodEnd

    this.api.getCars(
      "carsToRent",
      {
        "from": periodStart,
        "till": periodEnd
      }
    ).subscribe( reply => {
      this.productsList = reply as Car[]
      this.filteredList = this.productsList
      this.applyFilters( this.currentFilter )
    } )

  }

  dateFormatted( d: Date ) {
    let minutes = d.getMinutes()
    d.setMinutes( Math.max( minutes - ( minutes % 10 ), 10 ) )
    return d
  }

  constructor(
    private api: ThirdPartyApiService,
    private configs: CatalogService,
    private route: ActivatedRoute,
    private catalog: CatalogService
  ) {
    route.paramMap.subscribe( map => {
      this.isForSale = map.get( "type" ) != "rent"
      this.applyFilters( this.currentFilter )
    } )

    let from = new Date( new Date().setDate( new Date().getDate() + 1 ) )
    let till = new Date( new Date().setDate( new Date().getDate() + 3 ) )
    from = this.dateFormatted( from )
    till = this.dateFormatted( till )

    if ( catalog.from != null && catalog.till != null ) {
      console.log( catalog.from )
      console.log( catalog.till )
      from = catalog.from
      till = catalog.till
    }

    this.getByDate( from, till )
    configs.newFilter.subscribe( filter => this.applyFilters( filter ) )
    configs.sortItems.subscribe( type => this.applySort( type ) )
  }

}
