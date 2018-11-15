import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModalDialogComponent } from './image-modal-dialog.component';

describe('ImageModalDialogComponent', () => {
  let component: ImageModalDialogComponent;
  let fixture: ComponentFixture<ImageModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
