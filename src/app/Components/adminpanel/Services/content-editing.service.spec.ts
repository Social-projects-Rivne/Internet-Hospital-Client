import { TestBed } from '@angular/core/testing';

import { ContentEditingService } from './content-editing.service';

describe('ContentEditingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentEditingService = TestBed.get(ContentEditingService);
    expect(service).toBeTruthy();
  });
});
