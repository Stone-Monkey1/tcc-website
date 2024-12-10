import { Component } from '@angular/core';
import { ScrollService } from '../services/scroll/scroll.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(private scrollService: ScrollService) {}
  scrollTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
  }
}
