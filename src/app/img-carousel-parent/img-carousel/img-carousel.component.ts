import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-img-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css'],
})
export class ImgCarouselComponent implements AfterViewInit {
  @Input() carouselItems: any[] = [];
  @ViewChild('scrollHorizontal') scrollHorizontal!: ElementRef;

  hasScrollbar = 'true';
  scrollRegion = 'min';
  activeIndex = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.updateScrollAttributes();
  }

  scroll(direction: 'left' | 'right') {
    const scrollElement = this.scrollHorizontal.nativeElement;
    const cardWidth = Math.round(
      scrollElement.querySelector('.scroll-item').offsetWidth + 12
    );
    const maxScroll =
      Math.round(scrollElement.scrollWidth - scrollElement.clientWidth) - 1;
    const currentScroll = Math.round(scrollElement.scrollLeft);

    const newScroll = Math.max(
      0,
      Math.min(
        direction === 'right'
          ? currentScroll + cardWidth
          : currentScroll - cardWidth,
        maxScroll
      )
    );

    scrollElement.scrollTo({ left: newScroll, behavior: 'smooth' });
    this.updateActiveIndex(newScroll, cardWidth);
  }

  scrollToIndex(index: number) {
    const scrollElement = this.scrollHorizontal.nativeElement;
    const cardWidth = Math.round(
      scrollElement.querySelector('.scroll-item').offsetWidth
    );
    const maxScroll =
      Math.round(scrollElement.scrollWidth - scrollElement.clientWidth) - 1;
    const newScroll = Math.min(index * cardWidth, maxScroll); // Clamp to maxScroll

    scrollElement.scrollTo({ left: newScroll, behavior: 'smooth' });
    this.activeIndex = index;
  }

  isActiveDot(index: number): boolean {
    return this.activeIndex === index; // Determine if the dot is active
  }

  updateActiveIndex(scrollLeft: number, cardWidth: number) {
    const maxIndex = this.carouselItems.length - 1;
    this.activeIndex = Math.min(
      Math.max(Math.round(scrollLeft / cardWidth), 0),
      maxIndex
    );
  }

  updateScrollAttributes() {
    const scrollElement = this.scrollHorizontal.nativeElement;
    const hasScrollbar = scrollElement.scrollWidth > scrollElement.clientWidth;
    this.hasScrollbar = hasScrollbar ? 'true' : 'false';

    const maxScroll =
      Math.round(scrollElement.scrollWidth - scrollElement.clientWidth) - 1;
    const currentScroll = Math.round(scrollElement.scrollLeft);

    this.scrollRegion =
      currentScroll <= 1 // Allow for a 1px buffer at the start
        ? 'min'
        : currentScroll >= maxScroll
        ? 'max'
        : 'middle';
  }
}
