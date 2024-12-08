import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCarouselParentComponent } from './img-carousel-parent.component';


describe('ImgCarouselParentComponent', () => {
  let component: ImgCarouselParentComponent;
  let fixture: ComponentFixture<ImgCarouselParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgCarouselParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgCarouselParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
