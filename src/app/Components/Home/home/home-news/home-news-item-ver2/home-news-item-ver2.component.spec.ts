import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsItemVer2Component } from './home-news-item-ver2.component';

describe('HomeNewsItemVer2Component', () => {
  let component: HomeNewsItemVer2Component;
  let fixture: ComponentFixture<HomeNewsItemVer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNewsItemVer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNewsItemVer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
