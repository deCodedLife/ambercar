import { Injectable } from '@angular/core';
import {Car} from "./interfaces/car-interface";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor() { }
  selectedCar: Car

}
