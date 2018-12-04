import { TestBed } from '@angular/core/testing';

import { ContentHandlingService } from './content-handling.service';

describe('ContentHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentHandlingService = TestBed.get(ContentHandlingService);
    expect(service).toBeTruthy();
  });
});
