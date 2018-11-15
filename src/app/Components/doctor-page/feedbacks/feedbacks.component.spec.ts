import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsFeedbacksComponent } from './feedbacks.component';

describe('DoctorsFeedbacksComponent', () => {
  let component: DoctorsFeedbacksComponent;
  let fixture: ComponentFixture<DoctorsFeedbacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsFeedbacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
