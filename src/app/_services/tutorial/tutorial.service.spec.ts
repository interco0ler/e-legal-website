import { TestBed } from '@angular/core/testing';

import { TUTORIALService } from './tutorial.service';

describe('TUTORIALService', () => {
  let service: TUTORIALService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TUTORIALService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
