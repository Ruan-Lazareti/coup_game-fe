import { TestBed } from '@angular/core/testing';

import { PerksService } from './perks.service';

describe('PerksService', () => {
  let service: PerksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
