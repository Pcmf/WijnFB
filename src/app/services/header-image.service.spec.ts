import { TestBed } from '@angular/core/testing';

import { HeaderImageService } from './header-image.service';

describe('HeaderImageService', () => {
  let service: HeaderImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
