import { TestBed } from '@angular/core/testing';

import { LoadingStateService } from './loading-state.service';

describe('LoadingStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingStateService = TestBed.get(LoadingStateService);
    expect(service).toBeTruthy();
  });
});
