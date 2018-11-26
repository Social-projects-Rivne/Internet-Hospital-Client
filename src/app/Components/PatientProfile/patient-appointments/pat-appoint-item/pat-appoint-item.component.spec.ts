import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatAppointItemComponent } from './pat-appoint-item.component';

describe('PatAppointItemComponent', () => {
  let component: PatAppointItemComponent;
  let fixture: ComponentFixture<PatAppointItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatAppointItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatAppointItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
