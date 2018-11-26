import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsItemComponent } from './appointments-item.component';

describe('AppointmentsItemComponent', () => {
  let component: AppointmentsItemComponent;
  let fixture: ComponentFixture<AppointmentsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
