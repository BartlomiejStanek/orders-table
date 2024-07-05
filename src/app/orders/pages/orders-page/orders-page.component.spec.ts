import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPageComponent } from './orders-page.component';
import { OrderService } from '../../../api/services/order.service';

describe('OrdersPageComponent', () => {
  let component: OrdersPageComponent;
  let fixture: ComponentFixture<OrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPageComponent],
      providers: [{ provide: OrderService, useValue: { getOrders: () => { } }}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
