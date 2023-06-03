import {Car} from "./car-interface";

const classes = [
  "light",
  "average",
  "compact",
  "mini",
  "adaptive",
  "standard",
  "business",
  "cargo buses",
  "passenger bus"
]

const colors = [
  "black_000000",
  "silver_CCCCCC",
  "white_FFFFFF",
  "blue_000099",
  "brown_663300",
  "gray_666666",
  "green_006600",
  "red_CC0000"
]

const sortTypes = [
  "descendingPrice",
  "priceAscending",
  "byName"
]

export class Filter {
  receivePlace: string = null
  returnPlace: string = null

  periodStart: Date = null
  periodEnd: Date = null

  brand: string = null
  model: string = null
  modelIndex: number = null
  priceFrom: number = null
  priceTo: number = null
  color: string = null
  colorIndex: number = null
  passengersCount: number = null
  dateUpdated: boolean = false


  convert(): void {
    if ( this.brand != null )
      this.brand = this.brand.toUpperCase()

    if ( this.modelIndex != null )
      this.model = classes[ this.modelIndex ]

    if ( this.colorIndex != null )
      this.color = colors[ this.colorIndex ]

  }
}
