import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackClaimComponent } from './feedback-claim.component';

describe('FeedbackClaimComponent', () => {
  let component: FeedbackClaimComponent;
  let fixture: ComponentFixture<FeedbackClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
