import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEvenComponent } from './details-even.component';

describe('DetailsEvenComponent', () => {
  let component: DetailsEvenComponent;
  let fixture: ComponentFixture<DetailsEvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEvenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsEvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
