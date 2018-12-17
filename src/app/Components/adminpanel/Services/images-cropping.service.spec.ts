import { TestBed } from '@angular/core/testing';

import { ImagesCroppingService } from './images-cropping.service';

describe('ImagesCroppingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesCroppingService = TestBed.get(ImagesCroppingService);
    expect(service).toBeTruthy();
  });
});
