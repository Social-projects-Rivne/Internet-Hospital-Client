import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoProfileComponent } from './patient-info-profile.component';

describe('PatientInfoProfileComponent', () => {
  let component: PatientInfoProfileComponent;
  let fixture: ComponentFixture<PatientInfoProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInfoProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
