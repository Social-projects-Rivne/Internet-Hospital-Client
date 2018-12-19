import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePatientsComponent } from './active-patients.component';

describe('ActivePatientsComponent', () => {
  let component: ActivePatientsComponent;
  let fixture: ComponentFixture<ActivePatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
