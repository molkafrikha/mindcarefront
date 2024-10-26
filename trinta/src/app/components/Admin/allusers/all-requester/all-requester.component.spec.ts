import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequesterComponent } from './all-requester.component';

describe('AllRequesterComponent', () => {
  let component: AllRequesterComponent;
  let fixture: ComponentFixture<AllRequesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRequesterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
