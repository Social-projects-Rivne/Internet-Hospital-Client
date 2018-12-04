import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagingComponent } from './content-managing.component';

describe('ContentManagingComponent', () => {
  let component: ContentManagingComponent;
  let fixture: ComponentFixture<ContentManagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentManagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
