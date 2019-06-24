import { TestBed, inject } from '@angular/core/testing';

import { UserLoginHandlerService } from './user-login-handler.service';

describe('UserLoginHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoginHandlerService]
    });
  });

  it('should be created', inject([UserLoginHandlerService], (service: UserLoginHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
