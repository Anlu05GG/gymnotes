import { TestBed } from '@angular/core/testing';

import { EntrenarService } from './entrenar.service';

describe('EntrenarService', () => {
  let service: EntrenarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrenarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
