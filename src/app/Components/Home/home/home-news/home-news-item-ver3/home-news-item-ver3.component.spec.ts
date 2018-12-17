import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsItemVer3Component } from './home-news-item-ver3.component';

describe('HomeNewsItemVer3Component', () => {
  let component: HomeNewsItemVer3Component;
  let fixture: ComponentFixture<HomeNewsItemVer3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNewsItemVer3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNewsItemVer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
