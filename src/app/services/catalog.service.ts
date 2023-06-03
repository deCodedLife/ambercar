import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Filter} from "./interfaces/filter-interface";

export enum SortTypes {
  Increase,
  Decrease,
  ByName
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  newFilter = new Subject<Filter>()
  sortItems = new Subject<SortTypes>()

  from: Date = null
  till: Date = null

  constructor() { }
}
