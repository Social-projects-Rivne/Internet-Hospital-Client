import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataApproveComponent } from './data-approve.component';

describe('DataApproveComponent', () => {
  let component: DataApproveComponent;
  let fixture: ComponentFixture<DataApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
