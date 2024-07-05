import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClient } from '@angular/common/http';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService, { provide: HttpClient, useValue: { get: () => { } }}]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
