import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCarouselComponent } from './tutorial-carousel.component';

describe('TutorialCarouselComponent', () => {
  let component: TutorialCarouselComponent;
  let fixture: ComponentFixture<TutorialCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
