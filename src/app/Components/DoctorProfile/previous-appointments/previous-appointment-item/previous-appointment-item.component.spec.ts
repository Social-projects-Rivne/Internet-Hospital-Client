import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousAppointmentItemComponent } from './previous-appointment-item.component';

describe('PreviousAppointmentItemComponent', () => {
  let component: PreviousAppointmentItemComponent;
  let fixture: ComponentFixture<PreviousAppointmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousAppointmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousAppointmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
