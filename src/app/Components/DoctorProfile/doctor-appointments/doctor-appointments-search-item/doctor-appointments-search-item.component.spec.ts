import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentsSearchItemComponent } from './doctor-appointments-search-item.component';

describe('PreviousSearchItemComponent', () => {
  let component: DoctorAppointmentsSearchItemComponent;
  let fixture: ComponentFixture<DoctorAppointmentsSearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAppointmentsSearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAppointmentsSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
