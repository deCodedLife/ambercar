import { Component } from '@angular/core';
import {CatalogService} from "../../../../services/catalog.service";
import {Filter} from "../../../../services/interfaces/filter-interface";

@Component({
  selector: 'app-sidenav-filters',
  templateUrl: './sidenav-filters.component.html',
  styleUrls: ['./sidenav-filters.component.scss']
})

export class SidenavFiltersComponent {
  constructor(
    private configs: CatalogService
  ) {
  }

  currentSettings: Filter = new Filter()

  formatLabel(value: number): string {
    return `${value}€`;
  }

  emit () {
    this.configs.newFilter.next( this.currentSettings )
  }
}
