import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { AlBioComponent } from './al-bio/al-bio.component';
import { ImgCarouselComponent } from './img-carousel-parent/img-carousel/img-carousel.component';
import { CommonModule } from '@angular/common';
import { ImgCarouselParentComponent } from './img-carousel-parent/img-carousel-parent.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FormComponent,
    AlBioComponent,
    ImgCarouselComponent,
    CommonModule,
    ImgCarouselParentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'al-thomason-website';
}
