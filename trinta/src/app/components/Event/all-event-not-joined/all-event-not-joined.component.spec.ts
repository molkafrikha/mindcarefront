import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventNotJoinedComponent } from './all-event-not-joined.component';

describe('AllEventNotJoinedComponent', () => {
  let component: AllEventNotJoinedComponent;
  let fixture: ComponentFixture<AllEventNotJoinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEventNotJoinedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllEventNotJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
