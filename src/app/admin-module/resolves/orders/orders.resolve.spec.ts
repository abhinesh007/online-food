import { TestBed, inject } from '@angular/core/testing';

import { OrdersResolver } from './orders.resolve';

describe('OrdersResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersResolver]
    });
  });

  it('should be created', inject([OrdersResolver], (service: OrdersResolver) => {
    expect(service).toBeTruthy();
  }));
});
