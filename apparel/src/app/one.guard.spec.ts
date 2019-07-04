import { TestBed, async, inject } from '@angular/core/testing';

import { OneGuard } from './one.guard';

describe('OneGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OneGuard]
    });
  });

  it('should ...', inject([OneGuard], (guard: OneGuard) => {
    expect(guard).toBeTruthy();
  }));
});
