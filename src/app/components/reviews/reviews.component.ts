import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../services/interfaces/review-interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {

  list: Review[]

  pagesCount: number = 0
  currentPage: number = 0

  @Input() page: string
  @Input() itemsCount: number = 2
  @ViewChild( "scroll" ) scrollbar

  ngOnInit(): void {
    this.reviews.getByPage( this.page ).subscribe( reply => {
      this.list = reply.data as Review[]
      this.pagesCount = this.list.length / this.itemsCount
      this.currentPage = 1
    } )
  }

  forward() {
    if ( this.currentPage == this.pagesCount ) return
    this.currentPage++
  }

  backward() {
    if ( this.currentPage == 1 ) return;
    this.currentPage--
  }

  secureURL( index: number ) {
    return this.sanitazer.bypassSecurityTrustResourceUrl( this.list[ index ].src )
  }

  constructor(
    private reviews: ReviewsService,
    private sanitazer: DomSanitizer
  ) {
  }

  isCurrent( i: number ): string {
    return this.currentPage == ( Math.ceil( i / this.itemsCount ) ) ? "block" : "none"
  }
}
