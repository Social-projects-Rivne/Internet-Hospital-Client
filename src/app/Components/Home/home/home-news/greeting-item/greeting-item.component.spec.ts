import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingItemComponent } from './greeting-item.component';

describe('GreetingItemComponent', () => {
  let component: GreetingItemComponent;
  let fixture: ComponentFixture<GreetingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
