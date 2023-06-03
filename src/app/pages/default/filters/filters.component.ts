import {Component, EventEmitter, Output} from '@angular/core';
import {Filter} from "../../../services/interfaces/filter-interface";
import {ConfigsService} from "../../../services/configs.service";
import {CatalogService, SortTypes} from "../../../services/catalog.service";
import {SidenavTypes} from "../sidenav/sidenav.component";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {

  constructor(
    private configs: ConfigsService,
    private catalog: CatalogService
  ) {
  }

  @Output() onFiltersChanged = new EventEmitter<Filter>()
  currentSettings: Filter = new Filter()

  dateChanged( changes: object ) {
    this.currentSettings.periodStart = changes[ "from" ]
    this.currentSettings.periodEnd = changes[ "till" ]
  }

  emitChanges() {
    this.catalog.newFilter.next( this.currentSettings )
    this.currentSettings.dateUpdated = false;
  }

  setSortType( type: number ) {
    if ( type == 0 ) this.catalog.sortItems.next( SortTypes.Decrease )
    if ( type == 1 ) this.catalog.sortItems.next( SortTypes.Increase )
    if ( type == 2 ) this.catalog.sortItems.next( SortTypes.ByName )
  }

  openDialog() {
    this.configs.toggleSidenav.next( SidenavTypes.Filters )
  }

}
