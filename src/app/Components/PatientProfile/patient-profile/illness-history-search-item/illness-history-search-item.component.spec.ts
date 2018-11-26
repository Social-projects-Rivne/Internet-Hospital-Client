import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllnessHistorySearchItemComponent } from './illness-history-search-item.component';

describe('IllnessHistorySearchItemComponent', () => {
  let component: IllnessHistorySearchItemComponent;
  let fixture: ComponentFixture<IllnessHistorySearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllnessHistorySearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllnessHistorySearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
