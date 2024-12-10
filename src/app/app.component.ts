import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { AlBioComponent } from './al-bio/al-bio.component';
import { ImgCarouselComponent } from './img-carousel-parent/img-carousel/img-carousel.component';
import { CommonModule } from '@angular/common';
import { ImgCarouselParentComponent } from './img-carousel-parent/img-carousel-parent.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FormComponent,
    AlBioComponent,
    ImgCarouselComponent,
    NavComponent,
    FooterComponent,
    CommonModule,
    ImgCarouselParentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'al-thomason-website';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Get the nav and header elements
    const nav = this.el.nativeElement.querySelector('nav');
    const header = this.el.nativeElement.querySelector('.header');

    if (nav && header) {
      // Get the height of the nav and set it as margin-top for the header
      const navHeight = nav.offsetHeight + 'px';
      this.renderer.setStyle(header, 'margin-top', navHeight);
    }
  }
}
