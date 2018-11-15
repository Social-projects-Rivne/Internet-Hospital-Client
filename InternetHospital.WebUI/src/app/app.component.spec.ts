import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  // tslint:disable-next-line:prefer-const
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
     TestBed.configureTestingModule({
        declarations: [ AppComponent ],
         imports: [ RouterTestingModule ] });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
