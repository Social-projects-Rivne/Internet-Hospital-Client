import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllnessHistoryComponent } from './illness-history.component';

describe('IllnessHistoryComponent', () => {
  let component: IllnessHistoryComponent;
  let fixture: ComponentFixture<IllnessHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllnessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllnessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
