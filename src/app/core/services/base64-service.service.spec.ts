import { TestBed } from '@angular/core/testing';

import { Base64ServiceService } from './base64-service.service';

describe('Base64ServiceService', () => {
  let service: Base64ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
