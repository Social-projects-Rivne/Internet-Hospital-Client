import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousSearchItemComponent } from './previous-search-item.component';

describe('PreviousSearchItemComponent', () => {
  let component: PreviousSearchItemComponent;
  let fixture: ComponentFixture<PreviousSearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousSearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
