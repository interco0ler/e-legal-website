import {
  AfterViewInit, Component, ElementRef, Input, ViewChild, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../_shared/shared.module';

export interface TutorialItem {
  slug?: string;
  title?: string;
  img: string;
  thumb: string;
}

@Component({
  selector: 'tutorial-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink, SharedModule],
  templateUrl: './tutorial-carousel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TutorialCarouselComponent implements AfterViewInit {
  @Input() items: TutorialItem[] = [];
  @ViewChild('swiper', { static: true }) swiperEl!: ElementRef<any>;

  constructor(
    private router: Router
  ) {}

  ngAfterViewInit() {
    const params = {
      init: false,               
      slidesPerView: 1.1,
      spaceBetween: 16,
      grabCursor: true,          // cursor “pegada”
      allowTouchMove: true,      // arrastar com mouse/touch
      navigation: false,         // <- SEM SETAS
      pagination: { clickable: true, enabled: false }, // bolinhas (opcional)
      autoplay: {
        delay: 3500,                 // avança sozinho a cada 3.5s
        pauseOnMouseEnter: true,     // pausa se o mouse passar por cima
        disableOnInteraction: false, // continua depois que o user arrastar
      },
      loop: true,                
      speed: 600,                
      breakpoints: {
        640:  { slidesPerView: 1.5, spaceBetween: 18 },
        768:  { slidesPerView: 2.2, spaceBetween: 20 },
        1024: { slidesPerView: 3.2, spaceBetween: 24 }
      }
    };

    Object.assign(this.swiperEl.nativeElement, params);
    this.swiperEl.nativeElement.initialize();
  }
}
