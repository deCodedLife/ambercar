import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})

export class SwiperComponent implements OnInit {

  nextAnimation: Keyframe[][] = [
    [
      { left: '105%' },
      { left: '0%' }
    ],
    [
      { left: '0%' },
      { left: '-105%' }
    ]
  ]
  previousAnimation: Keyframe[][] = [
    [
      { left: '-105%' },
      { left: '0%' }
    ],
    [
      { left: '0%' },
      { left: '105%' }
    ]
  ]

  @Input() items: string[] = []
  @Input() displayAmount: number = 3

  spawnedItems: HTMLImageElement[] = []
  visibleItems: HTMLImageElement[] = []
  position: number = 0

  ngOnInit() {
    for ( let i = 0; i < this.items.length; i++ ) {

      let image = document.createElement( "img" )
      image.src = this.items.at( i )
      image.style.position = "inherit"

      if ( window.innerWidth < 767 ) {
        image.style.height = "50px"
      }

      this.spawnedItems.push( image )

    }

    this.displayImages()
  }

  displayImages() {
    let container = document.getElementById( "swiper-box" )
    this.visibleItems = []

    for ( let i = this.position; i < this.displayAmount; i++ ) {

      let item = this.spawnedItems[ Math.abs( i % this.spawnedItems.length ) ]
      this.visibleItems.push( item )

      container.appendChild( item )

    }
  }

}
