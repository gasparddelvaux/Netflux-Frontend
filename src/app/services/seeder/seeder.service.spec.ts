import { TestBed } from '@angular/core/testing';

import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeederService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
