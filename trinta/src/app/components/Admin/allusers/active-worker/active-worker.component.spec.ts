import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkerComponent } from './active-worker.component';

describe('ActiveWorkerComponent', () => {
  let component: ActiveWorkerComponent;
  let fixture: ComponentFixture<ActiveWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveWorkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
