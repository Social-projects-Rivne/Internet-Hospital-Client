import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistSearchComponent } from './userlist-search.component';

describe('UserlistSearchComponent', () => {
  let component: UserlistSearchComponent;
  let fixture: ComponentFixture<UserlistSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlistSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
