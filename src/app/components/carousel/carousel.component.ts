import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChildren} from '@angular/core';
import {AnimationMetadataType, keyframes} from "@angular/animations";

export interface CarouselItem {
  image: string
  title: string
  description: string
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {

  @Input() items: CarouselItem[] = []
  @Input() height: number

  @Output() selected = new EventEmitter<number>()

  previousImage: HTMLImageElement
  selectedItem: number = 0
  initializedItems: HTMLImageElement[] = []
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

  ngOnInit() {
    this.items.forEach( item => {
      let image = document.createElement( "img" )
      image.src = item.image
      image.style.position = 'absolute'
      image.style.width = '100%'
      image.style.left = '105%'

      this.initializedItems.push( image )
    } )

    this.spawnImage( this.nextAnimation )
  }

  spawnImage( animation: Keyframe[][] ) {

    let image = this.initializedItems[ Math.abs( this.selectedItem % this.items.length ) ]

    document.getElementById( "view-box" ).appendChild( image )

    if ( this.previousImage ) {
      this.previousImage.animate(
        animation[1], {
          duration: 500,
          direction: "alternate",
          iterations: 1,
          fill: "forwards"
        }).finished.then( _ => {
          this.previousImage.style.position = 'absolute'
          this.previousImage.remove()
      } )
    }


    image.animate( animation[0],
      {
        duration: 500,
        direction: "alternate",
        iterations: 1,
        fill: "forwards"
      }).finished.then( _ => {
        this.previousImage = image
        image.style.position = 'inherit'
    } )

  }


}
