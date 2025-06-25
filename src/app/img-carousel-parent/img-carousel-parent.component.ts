import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';

@Component({
  selector: 'app-img-carousel-parent',
  standalone: true,
  imports: [CommonModule, ImgCarouselComponent],
  templateUrl: './img-carousel-parent.component.html',
  styleUrl: './img-carousel-parent.component.css',
})
export class ImgCarouselParentComponent {
  carousels = [
    {
      carouselItems: [
        { backgroundClass: 'deck-before', title: 'Before' },
        { backgroundClass: 'deck-before-2', title: 'Before' },
        { backgroundClass: 'deck-after', title: 'After' },
        { backgroundClass: 'deck-after-2', title: 'After' },
      ],
      description: 'Revitalized 30+ year old wooden deck with new composite decking, composite railings, (2) sets of new stairs and slat underpinning.',
      customClass: 'carousel-1',
    },
    {
      carouselItems: [
        { backgroundClass: 'porch-before', title: 'Before' },
        { backgroundClass: 'porch-before-2', title: 'Before' },
        { backgroundClass: 'porch-after', title: 'After' },
        { backgroundClass: 'porch-after-2', title: 'After' },
      ],
      description: 'Enlarged existing screen porch, installed much less intrusive cable rail system and installed new screening.',
      customClass: 'carousel-2',
    },
    // {
    //   carouselItems: [
    //     { backgroundClass: 'siding-replacement-before', title: 'Before' },
    //     { backgroundClass: 'siding-replacement-after', title: 'After' },
    //   ],
    //   description: 'Siding replacement for a more modern look.',
    //   customClass: 'carousel-3',
    // },
    {
      carouselItems: [
        { backgroundClass: 'gordons-1', title: 'Completed' },
        { backgroundClass: 'gordons-2', title: 'Completed' },
        { backgroundClass: 'gordons-3', title: 'Completed' },
        { backgroundClass: 'gordons-4', title: 'Completed' },
      ],
      description: 'From an open lot to a fully constructed detached garage, this project was built from the ground up. We handled everything from the foundation and framing to roofing, siding, and final finishes—creating a functional and durable space that blends seamlessly with the property.',
      customClass: 'carousel-4',
    },
    {
      carouselItems: [
        { backgroundClass: 's-laurel-1', title: 'Before' },
        { backgroundClass: 's-laurel-3', title: 'After' },
        { backgroundClass: 's-laurel-2', title: 'After' },
      ],
      description: `We gave this home's entryway a fresh new look by scraping down the worn paint and refinishing the front pillars with a crisp, clean coat. The result is a polished, updated appearance that enhances the home’s curb appeal and protects the structure for years to come.`,
      customClass: 'carousel-5',
    },
  ];
}
