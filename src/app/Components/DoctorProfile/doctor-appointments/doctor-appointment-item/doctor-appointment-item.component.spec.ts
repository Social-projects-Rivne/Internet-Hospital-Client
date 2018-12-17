import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentItemComponent } from './doctor-appointment-item.component';

describe('PreviousAppointmentItemComponent', () => {
  let component: DoctorAppointmentItemComponent;
  let fixture: ComponentFixture<DoctorAppointmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
