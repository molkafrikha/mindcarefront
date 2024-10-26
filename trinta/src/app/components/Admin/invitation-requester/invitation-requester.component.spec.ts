import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationRequesterComponent } from './invitation-requester.component';

describe('InvitationRequesterComponent', () => {
  let component: InvitationRequesterComponent;
  let fixture: ComponentFixture<InvitationRequesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationRequesterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitationRequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
