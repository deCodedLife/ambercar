import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {ConfigsService} from "../../services/configs.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {coerceNumberProperty} from "@angular/cdk/coercion";

export class Time {
  hours: number
  minutes: number
}

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private configs: ConfigsService,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this.translate.onLangChange.subscribe( lang => {
      this.observeData()
      this.adapter.setLocale( lang.lang )
    } )
    this.observeData()

    this.minDate = new Date( new Date().setDate( new Date().getDate() + 1 ) )
    this.adapter.setLocale( configs.currentLanguage )
    this.from.minutes = Math.max( this.from.minutes - this.from.minutes % 10, 10 )
    this.till.minutes = Math.max( this.till.minutes - this.till.minutes % 10, 10 )
  }

  ngOnInit() {

    if ( this.customFromDate == null || this.customTillDate == null ) return

    this.value.get( "start" ).setValue( this.customFromDate )
    this.value.get( "end" ).setValue( this.customTillDate )

    this.till = {
      hours: this.customTillDate.getHours(),
      minutes: this.customTillDate.getMinutes()
    }
    this.from = {
      hours: this.customFromDate.getHours(),
      minutes: this.customFromDate.getMinutes()
    }
  }

  @Input() customTillDate: Date = null
  @Input() customFromDate: Date = null

  @Input() placeholder: string
  @Output() dateChanged = new EventEmitter<object>()

  incorrectData: string = "Laiks ievadīts nepareizi"
  @Input() isWrapped: boolean = false

  minDate: Date = new Date( new Date().setDate( new Date().getDate() + 1 ) )

  value = new FormGroup({
    start: new FormControl( new Date( new Date().setDate( new Date().getDate() + 1 ) ) ),
    end: new  FormControl( new Date( new Date().setDate( new Date().getDate() + 3 ) ) )
  })

  from: Time = { hours: (this.value.get( "start" ).value as Date).getHours(), minutes: (this.value.get( "start" ).value as Date).getMinutes() }
  till: Time = { hours: (this.value.get( "end" ).value as Date).getHours(), minutes: (this.value.get( "end" ).value as Date).getMinutes() }

  getTimeFormatted( number ) {
    if ( number <= 10 ) return 10
    return number - ( number % 10 )
  }

  setFromMinutes() {
    this.from.minutes = Math.max( this.till.minutes - ( this.till.minutes % 10 ), 10 )
  }

  setTillMinutes() {
    this.till.minutes = Math.max( this.till.minutes - ( this.till.minutes % 10 ), 10 )
  }

  observeData() {
    this.translate.get( "all.incorrectTime" ).subscribe( d => this.incorrectData = d )
  }

  isValid( number: number, type: string ): boolean {

    if ( type != "min" && type != "hours" ) return false

    if ( number < -1 ) return false;
    if ( number > 24 && type == "hours" ) return false
    if ( number > 60 && type == "min" ) return false;

    return true

  }

  emitChanges() {

    let dateRange = Object.create(null)

    if (
      !this.isValid( this.from.hours, "hours" ) ||
      !this.isValid( this.from.minutes, "min" ) ||
      !this.isValid( this.till.hours, "hours" ) ||
      !this.isValid( this.till.minutes, "min" )
    ) {
      this.snackBar.open( this.incorrectData, null, {
        duration: 3000
      } )
      return
    }

    let start: Date = this.value.get( "start" ).value// ?? this.minDate
    let end: Date = this.value.get( "end" ).value// ?? new Date( new Date().setDate( new Date().getDate() + 3 ) )

    if ( !end ) return;

    if ( start ) {
      start.setHours( this.from.hours ?? 12 )
      start.setMinutes( this.from.minutes ?? 0 )
    }

    end.setHours( this.till.hours ?? 12 )
    end.setMinutes( this.till.minutes ?? 0 )


    dateRange[ "from" ] = start
    dateRange[ "till" ] = end

    this.dateChanged.emit( dateRange )
  }

}
