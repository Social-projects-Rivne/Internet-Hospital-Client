import { TestBed } from '@angular/core/testing';

import { HomeContentService } from './home-content.service';

describe('HomeContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeContentService = TestBed.get(HomeContentService);
    expect(service).toBeTruthy();
  });
});
