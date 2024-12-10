import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class ScrollService {
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = document.querySelector('nav')?.clientHeight || 0; // Adjust for navigation bar height
      const offsetPosition = element.offsetTop - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}
