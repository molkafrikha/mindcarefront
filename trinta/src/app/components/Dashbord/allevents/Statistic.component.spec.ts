import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleventsComponent } from './Statistic.component';
import { CommonModule } from '@angular/common';

describe('AlleventsComponent', () => {
  let component: AlleventsComponent;
  let fixture: ComponentFixture<AlleventsComponent>;
   
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlleventsComponent , CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlleventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}

);
