import { TestBed } from '@angular/core/testing';

import { PuebloService } from './pueblo.service';

describe('PuebloService', () => {
  let service: PuebloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuebloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
