import { TestBed, inject } from '@angular/core/testing';

import { UserDataResolver } from './user-data.resolve';

describe('UserDataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataResolver]
    });
  });

  it('should be created', inject([UserDataResolver], (service: UserDataResolver) => {
    expect(service).toBeTruthy();
  }));
});
