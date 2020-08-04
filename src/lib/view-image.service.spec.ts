import { TestBed } from '@angular/core/testing';

import { ViewImageService } from './view-image.service';

describe('ViewImageService', () => {
  let service: ViewImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
