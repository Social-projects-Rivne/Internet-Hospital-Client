import { TestBed } from '@angular/core/testing';

import { UsersProfileService } from './users-profile.service';

describe('UsersProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersProfileService = TestBed.get(UsersProfileService);
    expect(service).toBeTruthy();
  });
});
