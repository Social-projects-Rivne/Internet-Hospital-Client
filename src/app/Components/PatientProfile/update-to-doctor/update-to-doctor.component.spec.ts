import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateToDoctorComponent } from './update-to-doctor.component';

describe('UpdateToDoctorComponent', () => {
  let component: UpdateToDoctorComponent;
  let fixture: ComponentFixture<UpdateToDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateToDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateToDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
