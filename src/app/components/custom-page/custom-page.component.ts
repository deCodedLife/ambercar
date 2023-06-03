import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page} from "../../services/interfaces/page-interface";
import {HeaderService} from "../../services/header.service";
import {PagesService} from "../../services/pages.service";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})

export class CustomPageComponent {
  currentTab: number = 0

  @Input() currentPage: Page
  @Output() edited = new EventEmitter<Page>();

  emit() {
   this.edited.emit( this.currentPage )
  }
}
