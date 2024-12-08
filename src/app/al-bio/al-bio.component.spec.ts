import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlBioComponent } from './al-bio.component';

describe('AlBioComponent', () => {
  let component: AlBioComponent;
  let fixture: ComponentFixture<AlBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlBioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
