import { TestBed } from '@angular/core/testing';

import { UserListService } from './user-list.service';

describe('UserListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserListService = TestBed.get(UserListService);
    expect(service).toBeTruthy();
  });
});
