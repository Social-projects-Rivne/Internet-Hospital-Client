import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPlansComponent } from './doctorplans.component';

describe('DoctorPlansComponent', () => {
  let component: DoctorPlansComponent;
  let fixture: ComponentFixture<DoctorPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
